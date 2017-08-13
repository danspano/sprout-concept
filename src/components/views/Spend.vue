<template>
    <div class="spend-view">
        <menu-bar @menuButtonClicked="showMenu" title="Spend" />
          <transition v-on:enter="enter" v-on:leave="leave">
            <div class="main-column">
                <div class="section-title">
                    Budget Remaining
                </div>
                <div class="hero-value">
                    <div class="value amount-remaining" :class="{positive: amountRemaining > 0, negative: amountRemaining < 0}">
                    ${{ amountRemaining }}
                    </div>
                </div>                
                <h4>
                    2 days left
                </h4>
                <div class="spacer"></div>
                <div class="section-title">
                    Add Expenses
                </div>
                <div class="new-expense">
                    <input type="text" class="input" placeholder="Name" v-model="newExpense.name">
                    <p class="control has-icon">
                    <input type="text" @keydown.enter="addExpense" class="input" placeholder="Amount" v-model="newExpense.amount">
                    <i class="fa fa-dollar"></i>
                    </p>
                    <a class="button is-success" @click="addExpense">Add Expense</a>
                </div>
                <div class="expenses">
                    <h3>Expenses:</h3>
                    <transition-group name="item-fade">
                      <div v-for="expense in expensesThisPeriod()" :key="expense['.key']">
                          ${{ expense.amount }}<span v-if="expense.name"> for {{ expense.name }}</span> on {{ friendlyDate(expense.timestamp)
                          }} <a @click="deleteExpense(expense)">remove</a>
                      </div>
                    </transition-group>
                </div>
            </div>
        </transition>
    </div>
</template> 

<script>
import MenuBar from './../MenuBar';
import Velocity from 'velocity-animate';
import db from '../../db';
import moment from 'moment';
import TWEEN from 'tween.js';

export default {
  name: 'spend-view',
  props: {
      user: {
          type: Object,
          required: false,
      }
  },
  data() {
    return {
      timestamp: moment().format(),
      newExpense: {
        name: null,
        amount: null
      },
      expenses: [],
      remainingAmount: 0,
      remainingAmountTweened: 0,
      userHasAdjustedExpenses: false,
    }
  },
  created() {
    if (this.user)
      this.bindFirebase();
  },
  methods: {
    showMenu() {
        this.$emit('showMenu');
    },
    expensesThisPeriod() {
        const periodStart = moment().startOf('week').unix();
        const periodEnd = moment().endOf('week').unix();

        if (this.expenses)
          return this.expenses.filter((expense) => {
            const timestamp = moment(expense.timestamp).format('X')
              return timestamp >= periodStart && timestamp <= periodEnd;
          })
        return [];
    },
    budgetRemaining() {
        var remaining = this.mostRecentBudget();

        this.expensesThisPeriod().forEach((expense) => {
          remaining -= parseFloat(expense.amount);
        })

        this.remainingAmount = parseFloat(remaining).toFixed(2);
        return parseFloat(remaining).toFixed(2);
    },
    friendlyDate(timestamp) {
            return moment(timestamp).format('dddd (Do MMM)');
    }, 
    mostRecentBudget() {
        return 200;
    },
    deleteExpense(expense) {
        this.userHasAdjustedExpenses = true;
            this.$firebaseRefs.expenses.child(expense['.key']).remove();
        },
    addExpense() {
        this.userHasAdjustedExpenses = true;
        this.$firebaseRefs.expenses.push({
                name: this.newExpense.name,
                amount: this.newExpense.amount,
                timestamp: moment().format()
        })
        this.newExpense = {
            name: null,
            amount: null
        }
    },
    bindFirebase() {
      const expenseRef = db.ref(`users/${this.user.uid}/expenses`);
      this.$bindAsArray('expenses', expenseRef)
      this.budgetRemaining();
    },
    attemptLogout() {
        this.$emit('logout');
    },
        enter: function (el, done) {
            Velocity(
            el,
            { opacity: [1, 0], translateX: [0, '-100%'] },
            { duration: 600, easing: [20, 8] },
            { complete: done }
            )
        },
        leave: function (el, done) {
            Velocity(
            el,
            { opacity: [0, 1], translateX: ['-100%', 0] },
            { duration: 600, easing: [20, 8] },
            { complete: done }
            )
        }
  },
  computed: {
    amountRemaining() {
      this.budgetRemaining();
      return this.userHasAdjustedExpenses ? this.remainingAmountTweened : this.remainingAmount;
    }
  },
  watch: {
    user(newUser) {
      if (newUser)
        this.bindFirebase();
    },
    remainingAmount: function(to, from) {

      let amount = {amount: from}
      let tween = new TWEEN.Tween(amount).to({
        amount: to
      }, 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => {
        this.remainingAmountTweened = parseFloat(amount.amount).toFixed(2);
      })
      .start();

      requestAnimationFrame(animate);

      function animate(time) {
          requestAnimationFrame(animate);
          TWEEN.update(time);
      }
    }
  },
  components: {
      MenuBar
  }
}
</script>

<style lang="scss" scoped>
    .spend-view {
        width: 100%;
        color: #444;
        background-color: #FFF;
    }
    
    .title {
        padding-bottom: 12px;
    }
  .new-expense {
    margin-top: 6px;
  }
  
  .expenses {
    margin-top: 40px;
  }
  
  .input {
    width: 180px;
  }
  
  .control.has-icon {
    display: inline;
  }
  
  .amount-remaining {
    &.positive {
      color: #23d160;
    }

    &.negative {
      color: #ff3860;
    }
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  
  .spend-button {
    margin-top: 18px;
  }
  
  .item-fade-enter-active,
  .item-fade-leave-active {
    transition: all .3s ease;
    transform: translateY(0px);
  }
  
  .item-fade-enter,
  .item-fade-leave-active {
    opacity: 0;
    transform: translateY(30px);
  }
</style>