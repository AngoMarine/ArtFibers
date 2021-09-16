// data : that what propose the website
const products = [
  { id: 1, description: "Tableau moderne abstrait", price: 1200, img: 'assets/img/tableau1.JPG'},
  { id: 2, description: 'Tableau sur toile ', price: 2000, img: 'assets/img/tableau2.jpeg'},
  { id: 3, description: 'Tableau en toile : Une journée magique', price: 50, img: 'assets/img/tableau3.png'},
  { id: 4, description: 'Jaragar Racing', price: 800, img: 'assets/img/tableau4.jpg'},
  { id: 5, description: 'Grande dame', price: 30, img: 'assets/img/tableau5.png'},
  { id: 6, description: 'Maserati Mechanical', price: 650, img: 'assets/img/tableau6.png'},
  { id: 7, description: 'Siesta', price: 250, img: 'assets/img/tableau10.png'},
  { id: 8, description: 'Brand Designer', price: 280, img: 'assets/img/tableau8.png'},
  { id: 9, description: 'Colores', price: 40, img: 'assets/img/tableau9.png'},
  { id: 10, description: 'Multifunction', price: 290, img: 'assets/img/tableau7.png'},
  { id: 11, description: 'Hip Hop Gold', price: 870, img: 'assets/img/tableau11.png'},
  { id: 12, description: 'Genova', price: 60, img: 'assets/img/tableau12.jpeg'},
];

const Home = {
  template: '#home',
  name: 'Home',
  data: () => {
    return {
      products,
      searchKey: '',
      liked: [],
      cart: []
    }
  },
  computed: {
    filteredList(){
      return this.products.filter((product) => {
        return product.description.toLowerCase().includes(this.searchKey.toLowerCase());
      })
    },
    getLikeCookie(){
      let cookieValue = JSON.parse($cookies.get('like'));
      cookieValue == null ? this.liked = [] : this.liked = cookieValue
    },
    cartTotalAmount(){
      let total = 0;
      for (let item in this.cart){
        total = total + (this.cart[item].quantity * this.cart[item].price)
      }
      return total;
    },
    itemTotalAmount(){
      let itemTotal = 0;
      for (let item in this.cart){
        itemTotal = itemTotal + (this.cart[item].quantity);          
      }
      return itemTotal;
    }
  },
  methods: {
    setLikeCookie(){
      document.addEventListener('input', () => {
        setTimeout(() => {
          $cookies.set('like', JSON.stringify(this.liked));
        }, 300);
      })
    },
    addToCart(product){
      // check if already in array
      for (let i = 0; i < this.cart.length; i++){
        if (this.cart[i].id === product.id) {
          return this.cart[i].quantity++
        }
      }
      this.cart.push({
        id: product.id,
        img: product.img,
        description: product.description,
        price: product.price,
        quantity: 1
      })
    },
    cartPlusOne(product){
      product.quantity = product.quantity + 1;
    },
    cartMinusOne(product, id){
      if (product.quantity == 1) {
        this.cartRemoveItem(id);
      } else {
        product.quantity = product.quantity -1;
      }
    },
    cartRemoveItem(id){
      this.$delete(this.cart, id)
    }
  },
  mounted: () => {
    this.getLikeCookie;
  }
}
const UserSettings = {
  template: '<h1>User Settings</h1>',
  name: 'UserSettings'
}
const WishList = {
  template: '<h1>Wish List</h1>',
  name: 'WishList'
}
const ShoppingCart = {
  template: '<h1>Shopping Cart</h1>',
  name: 'ShoppingCart'
}

// router : pour aiguiller nos pages
const router = new VueRouter({
  routes: [
    { path: '/', component: Home, name: 'Home' },
    { path: '/user-settings', component: UserSettings, name : 'UserSettings' },
    { path: '/wish-list', component: WishList, name: 'WishList' },
    { path: '/shopping-cart', component: ShoppingCart, name: 'ShoppingCart' },
  ]
})

const vue = new Vue({
  router
}).$mount('#app'); 
