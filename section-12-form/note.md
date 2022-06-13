1. vue + forms

2. form validation

3. script logic

```html
<form @submit.prevent="submitForm"></form>
<script>
  // @input
  // v-model='userName'
  <input id='user-name' name='user-name' type='text' v-model="userName">
  <input id="age" name="age" type="number" v-model='userAge' ref='ageInput'/>;

  {
    userName:'',
    userAge:null
  }
</script>
```

```js
console.log(this.userAge); // number
console.log(31); // number
console.log(this.$refs.ageInput.value); // string
```

4. v-modal

```html
<select id="referrer" name="referrer" v-model="referrer">
  <option value="google">Google</option>
  <option value="wom">wom</option>
  <option value="newspaper">Newspaper</option>
</select>

{ userName:'', userAge:null, referrer: 'wom' }
```

5. checkboxes and radio

```html
<div>
  <input
    id="interest-news"
    name="interest"
    type="checkbox"
    v-model="interest"
  />
  <label for="interest-news">News</label>
</div>

<div>
  <input id="how-video" name="how" type="radio" v-model="how" value="news" />
  <label for="how-video">Video Courses</label>
</div>

<div>
  <input id="how-blogs" name="how" type="radio" v-model="how" value="blogs" />
  <label for="how-blogs">Blogs</label>
</div>

<div>
  <input id="how-other" name="how" type="radio" v-model="how" value="other" />
  <label for="how-other">Other</label>
</div>

{ userName:'', userAge:null, referrer: 'wom', interest: [], how: null }
```

6. live validation

```html

```
