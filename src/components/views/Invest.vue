<template>
    <div class="invest-view">
        <menu-bar @menuButtonClicked="showMenu" title="Investments" />
        <div class="main-column">
            <div class="section-title">
                Net Value
            </div>
            <div class="hero-value positive">
                <div class="value positive">
                    $42,909.30
                </div>
                <div class="change">
                    <icon :iconName="'sort-asc'" />1.62%
                </div>
            </div>

            <div class="spacer"></div>
            <div class="hint">Try clicking the graph to see it transition with random data!</div>
            <bar-chart @empty="empty" :bars="bars" />
            <div class="spacer"></div>
            <div class="section-title">
                My Portfolio
            </div>
            <div class="spacer"></div>
            <div class="hint">Experimenting with data storage and modal inputs.</div>
            <div class="spacer"></div>

            <a class="button is-success" @click="showAddInvestment = true">Add Shares</a>
            <data-table :rows="$store.state.investments.investments" :columns="investmentTableColumns" @rowSelected="editInvestment" />
            <modal-view :showing="showAddInvestment" @modalClosed="showAddInvestment = false">
                  <span slot="title">
                        New Holding
                  </span>
                  <div>
                    <input type="text" v-model="newHolding.symbol" placeholder="Stock Symbol" /> 
                    <input type="text" v-model="newHolding.market" placeholder="Market Symbol" /> 
                    <button @click="addInvestment">save</button>
 
                  </div>
            </modal-view>
            <modal-view :showing="showEditInvestment" @modalClosed="showEditInvestment = false">
                  <span slot="title">
                        <span v-if="selectedInvestment">{{ selectedInvestment.symbol }}</span>
                  </span>
                  <div>
                    <select>
                    <option>Bought</option>
                    <option>Sold</option>
                    </select>
                    <input type="text" placeholder="Units" /> 
                    <input type="text" placeholder="Price" /> 
                    <input type="text" placeholder="Date" />
                    <button>add</button>
 
                  </div>
            </modal-view>
        </div>
    </div>
</template> 

<script>
import MenuBar from './../MenuBar';
import Icon from './../Icon';
import BarChart from './../BarChart/BarChart';
import LineChart from './../LineChart/LineChart';
import DataTable from './../DataTable/DataTable';
import ModalView from './../ModalView/ModalView';
import Vue from 'vue';

export default {
  name: 'invest-view',
  data() {
      return {
          bars: [],
          dataRotation: 'months',
          rows: [],
          lines: [
              {
                  color: '#1db151',
                  points: [
                    {x: 0, y: 10},
                    {x: 40, y: 20},
                    {x: 80, y: 10},
                    {x: 120, y: 40},
                    {x: 160, y: 80},
                    {x: 920, y: 10}
                  ]
              }
            ],
          showAddInvestment: false,
          showEditInvestment: false,
          selectedInvestment: null,
          newHolding: {
              market: null,
              symbol: null
          }
      }
  },
  props: {
      user: {
          type: Object,
          required: false,
      }
  },
  created() {
    if (this.user)
      this.bindFirebase();
  },
  computed: {
      investmentTableColumns() {
          return [
              {
                  label: 'Symbol',
                  value: function(row) {
                      return row.symbol;
                  }
              },
              {
                  label: 'Value',
                  value: function(row) {
                      return '$12.43';
                  }
              }
          ]
      },
      user() {
          return this.$store.state.authentication.user;
      }
  },
  methods: {
      showMenu() {
          this.$emit('showMenu');
      },
      addInvestment() {
        this.$store.dispatch('addInvestment', this.newHolding)
        this.newHolding = {
            market: null,
            symbol: null
        }
        this.showingModal = false;
      },
      editInvestment(investment) {
          this.selectedInvestment = investment
          this.showEditInvestment = true;
      },
      changeLineData() {
            this.lines = [
              {
                  color: '#23D160',
                  points: [
                    {x: 0, y: Math.random() * 300},
                    {x: 40, y: Math.random() * 300},
                    {x: 80, y: Math.random() * 300},
                    {x: 120, y: Math.random() * 300},
                    {x: 160, y: Math.random() * 300},
                    {x: 920, y: Math.random() * 300}
                  ]
              },
              {
                  color: '#01A9F1',
                  points: [
                    {x: 0, y: Math.random() * 300},
                    {x: 40, y: Math.random() * 300},
                    {x: 80, y: Math.random() * 300},
                    {x: 120, y: Math.random() * 300},
                    {x: 160, y: Math.random() * 300},
                    {x: 920, y: Math.random() * 300}
                  ]
              }
            ]
      },
      empty() {
          var prevLength = this.bars.length;

       //       this.showBars();

          this.bars = []
          setTimeout(() => {
              this.showBars();
          }, (prevLength * 60) + 60)


      },
      showBars() {


          if (this.dataRotation == 'months')
            this.bars = [
                {
                    percentage: Math.random(),
                    label: 'Jan'
                },
                {
                    percentage:  Math.random(),
                    label: 'Feb'
                },
                {
                    percentage:  Math.random(),
                    label: 'Mar'
                },
                {
                    percentage:  Math.random(),
                    label: 'Apr'
                },
                {
                    percentage:  Math.random(),
                    label: 'May'
                },
                {
                    percentage:  Math.random(),
                    label: 'Jun'
                },
                {
                    percentage:  Math.random(),
                    label: 'Jul'
                },
                {
                    percentage:  Math.random(),
                    label: 'Aug'
                },
                {
                    percentage:  Math.random(),
                    label: 'Sep'
                }
            ];
        else 
            this.bars = [
                    {
                        percentage: Math.random(),
                        label: 'Mon'
                    },
                    {
                        percentage:  Math.random(),
                        label: 'Tue'
                    },
                    {
                        percentage:  Math.random(),
                        label: 'Wed'
                    },
                    {
                        percentage:  Math.random(),
                        label: 'Thurs'
                    },
                    {
                        percentage:  Math.random(),
                        label: 'Fri'
                    },
                    {
                        percentage:  Math.random(),
                        label: 'Sat'
                    },
                    {
                        percentage:  Math.random(),
                        label: 'Sun'
                    }
                ];

            this.dataRotation = this.dataRotation == 'months' ? 'days' : 'months';
      },
    bindFirebase() {
        this.$store.dispatch('loadInvestments', this.user);
    }
  },
  mounted() {
      this.showBars();
  },
  watch: {
      user(newUser, oldUser) {
          if (newUser != null) {
              this.bindFirebase();
          }
      }
  },
  components: {
      MenuBar, BarChart, DataTable, ModalView, Icon, LineChart
  }
}
</script>

<style lang="scss" scoped>
    .invest-view {
        width: 100%;
        color: #444;
        background-color: #FFF;
    }
    .negative {
      color: #ff3860;
    }
    .positive {
      color: #23d160;
    }
</style>