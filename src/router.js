import VueRouter from 'vue-router';
import HomeView from './components/views/home';
import SpendView from './components/views/spend';
import EarnView from './components/views/Earn';
import InvestView from './components/views/Invest';

const routes = [{
    path: '/', component: HomeView, name: 'Home'
},
{
    path: '/spend', component: SpendView, name: 'Spend'
},
{
    path: '/earn', component: EarnView, name: 'Earn'
},
{
    path: '/invest', component: InvestView, name: 'Invest'
}
]

const router = new VueRouter({ routes });

export default router;