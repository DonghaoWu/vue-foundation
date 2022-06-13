1. npm install

2.

```diff
+ App.vue => <ul></ul>
+ App.uve => data => add storedResoutces with 4 attributes

+ components => learning-resources => LearningResource.vue =>
+ import LearningResource.vue in App.vue
+ App.uve => => <ul><learning-resource v-for><><ul>
+ pass all data from App.vue to LearningResource.vue
+ render two cards in browser

+ App.vue => styling => no scoped
+ LearningResource.vue => styling => scoped
+ components => learning-resources => StoredResources.vue
+ move ul from App.vue to StoredResources.vue
+ pass data from App.vue to StoredResources.vue
+ import LearningResource in StoredResources.vue
+ StoredResources.vue => styling => scoped
+ render two cards in browser

+ UI => BaseCard.vue => styling => scoped
+ BaseCard.vue => slot
+ import Basecard in main.js
+ apply Basecard in LearningResource.vue
+ BaseCard.vue => slot
+ components => layouts => TheHeader.vue
+ import TheHeader.vue in App.vue
+ TheHeader.vue => styling => scoped

+ UI => BaseButton.vue => styling => scoped
+ BaseButton.vue => styling => scoped
+ BaseButton.vue => slot
+ import BaseButton in main.js
+ Apply baseButton in LearningResource.vue => delete button

+ components => learning-resource => AddResource.vue
+ components => learning-resource => TheResources.vue
+ TheResources => add baseCard => add baseButton
+ add selectedTab: 'store-resources' in TheResources data
+ add setSelectedTab in TheResources method
+ add <component> in TheResources template
+ import TheResources in App.vue
- TheResources component should be in layouts folder
+ import StoredResource.vue in TheResources
+ import AddResource.vue in TheResources
+ move data from App.vue to TheResources

- hard to pass data through component
+ add provide in TheResources.vue => provide resources
+ add inject in StoredResource.vue => inject resources
+ add frist button mode in TheResources
+ change the mode formula into computed method

+ AddResource => base-card => form => three input areas
+ AddResource => base-card => form => one base button
+ AddResource => styling => scoped

+ AddResource => use ref to bind the data => this.@ref.titleInput.value
+ TheResources => add a new method => addResource
+ add provide in TheResources.vue => provide addResource
+ add inject in AddResource.vue => inject addResource
+ add addResource into the submitData method in AddResource.vue
+ bind submitData to the form element
+ add keep-alive in TheResource.vue

+ add empty validation in AddResource in submitData method => alert the message
+ UI => BaseDialog.vue => dialog => open
+ BaseDialog.vue => dialog => slot
+ BaseDialog.vue => dialog => header => slot => title => default
+ BaseDialog.vue => dialog => section => slot =>
+ BaseDialog.vue => dialog => menu => slot => actions
+ BaseDialog.vue => styling => scoped
+ import BaseDialog in main.js
+ add data => inpurIsInvalid: false in AddResource.vue
+ turn inpurIsInvalid on in submitData when the input is invalid
+ add BaseDialog on the top of AddResource.vue with if condition + title
+ add default template section in BaseDialog element
+ add actions template section in BaseDialog element
+ add confirmError method in AddResource.vue and attach it to okay button in actions template
+ add close method in BaseDialog
+ pass a close method from AddResource to base-dialog, @close = "confirmError"
+ emit the close method in BaseDialog.vue
+ emit the close method outside dialog in BaseDialog.vue
+ emit the close method in actions slot in a base button with Close caption
- 目前有 3 中方式关闭 dialog，但实际上是 2 种，第三种是第一种的 fall back solution

+ add removeResource method in TheResources.vue with resId param
+ add provide in TheResources.vue => provide removeResource
+ add inject in LearningResource.vue => inject removeResource
+ bind removeResource to a delete button in LearningResource
+ do not use filter in removeResource
+ user splice in removeResource

+ add teleport in BaseDialog.vue to wrap up all. => to="body"
```

2. implement log

```diff
$ vue create
+ main.js
+ App.vue
+ UI / BaseDialog / BaseButton / BaseCard
+ layouts / TheHeader / TheResources
+ StoredResources / AddResource
+ LearningResource
```

3. reproduce log

```diff
$ vue create app-11-rep // vue3

- phrase 1:
+ create two components in folder /components/layouts, TheHeader and TheResources
+ add H1 tag in TheHeader and TheResources
+ add styling in TheHeader
+ add styling in TheResources
+ add styling in App.vue
+ Add the two components in App.vue
+ show H1 tags in Browser

- phrase 2:
+ pass title from App.vue to TheHeader
+ Add more details in TheHeader
+ Add data in TheResources, storedResources
+ create a new component in folder /components/StoredResources.vue
+ add styling in StoredResources.vue
+ add StoredResources into TheResources
+ add a h1 tag in StoredResources.vue

- phrase 3:
+ pass the storedData from TheResources to StoredResources through provide()
+ receive the data in StoredResources by using inject
+ create a new component in folder /components/LearningResources.vue
+ add styling in LearningResources.vue
+ import LearningResources.vue in StoredResources.vue
+ add a h1 tag in LearningResources.vue

- phrase 4:
+ change <div> to <ul> in StoredResources
+ change <div> to <li> in LearningResources
+ pass the data that is from TheResources to StoredResources to LearningResources by using v-for
+ get the data in LearningResources.vue as props id/description/title/link
+ render the data in LearningResources.vue - id/description/title/link
+ add styling in StoredResources.vue

- phrase 5:
+ create a new UI component in folder /components/UI/BaseCard.vue
+ apply slot in BaseCard.vue
+ add styling in BaseCard.vue
+ register BaseCard.vue in main.js
+ Add BaseCard into the li tag in LearningResources.vue

- phrase 6:
+ create a new UI component in folder /components/UI/BaseButton.vue
+ apply slot in BaseButton.vue
+ add styling in BaseButton.vue
+ register BaseButton.vue in main.js
+ Add BaseButton into the BaseCard tag in LearningResources.vue
+ Pass text 'Delete' as BaseButton slot content
+ Add a method in TheResources.vue, called 'removeResource', with one parameter 'resId', to delete one data in stored resources (using split not filter)
+ provide the new method in TheResources
+ inject the method in Learingresources.vue
+ attach the method to click action in BaseButton in LearningResources.vue
- now you should be able to delete a resource by clicking the 'Delete' button.

- phrase 7
+ delete storedResources tag in TheResources
+ create a new component in folder /components/AddResource.vue
+ add a h1 tag in AddResource
+ import AddResource.vue in TheResources.vue
+ render AddResource
- now you should be able to see the h1 tag from AddResource.

- phrase 8
+ add styling in AddResource.vue
+ add a form in AddResource within BaseCard
+ add a new method in AddResource, called 'submitData', get the input data with refs
+ create a new method in TheResources.vue, called 'addResource', apply unshift to add new data
+ provide addResource in TheResources.vue
+ inject addResource in AddResource
+ invoke addResource at the end of submitData
- now you should be able to input a new resource in the form and render it at the top of the list.

- phrase 9
+ create a new UI component in folder /components/UI/BaseDialog.vue
+ apply slot in BaseDialog.vue
+ add styling in BaseDialog.vue
+ register BaseDialog.vue in main.js
+ Add BaseDialog into AddResource.vue, right above base-card
+ create a new local data called 'inputIsInvalid' to control the showing up of base-dialog, default value is false
+ if one of the input of the form is empty, set inputIsInvalid to true so the dialog will show up.
+ create a new method, called 'closedAlertDialog' in AddResource.vue, the method is going to turn 'inputIsInvalid' off, attach the method to close event of BaseDialog
+ emits the close method in BaseDialog
+ attach the close method to click events, close button & outside the dialog
+ teloport BaseDialog to body level
- now you should be able to see if you input is empty in any line of the form then you will see a dialog window with a close button.

- phrase 10
+ delete the content of template in TheResources.vue
+ Add two BaseButtons in TheResources, wrapped by a BaseCard
+ create a new local data called `selectedTab`, default value is 'stored-resources',
+ create a new method in TheResources, called 'setSelectedTab', with one param, called 'tab', to modify selectedTab to the param.
+ attach the method to the two BaseButton
+ add two computed function, attach them to a variable called 'mode' that will be passed down to BaseButton
+ add keep-alive + component div below BaseCard in Theresources.vue
+ add `this.selectedTab = 'stored-resources';` at the end of addResource method in TheResources.vue so the app will redirect to storedResources tab after submit the data successfully.
- now you should be able to implement to whole functionality.
```
