# A quick guide on state management using redux.

## The store

- The store currently has 2 entities:
  - States
  - Updates
- Each entity is handled by the 2 main elements:
  - Actions
  - Reducers.

## The structure

### Action creators

A collection of functions which return an action object which has a type property (which specifies the type of action) and an optional payload property.

### Reducers

Based on the action type the reducers' job is to return a state. General convention is to use a switch case on the "action.type"

### Action types

A collection of constants used by the actions and reducers. These constants are the different action types we want. (eg. DATA_LOADING, DATA_FETCHED, etc.)

## The Goal

The goal is to handle the 3 types of situations we might face while making API calls:

- **Success:** Data loaded from API successfully.
- **Loading:** Data is being loaded.
- **Error:** Error while making the API call.

Since we are using API calls we would need to use a middleware 'redux-thunk' which allows us to return a function rather than an action object in the action creators. You can write your API call in this function.

> For more information regarding redux-thunk: https://youtu.be/z2XCUu2wIl0

## Actions

The action creators should be able to dispatch 3 types of actions based on the 3 situations we are trying to handle.

**For "Loading State":** Before making any API call we can just dispatch an action with the type `DATA_REQUEST` or `DATA_LOADING`.

**For "Success State"**: After recieving the data from an API call we can dispatch an action with a `DATA_SUCCESS` type and a payload of the data we have just fetched.

**For "Error State":** If an error is thrown while making the API request we should catch the error and handle it by dispatching an appropriate action of type like `DATA_ERROR` and payload as the error object.

## Reducers

We should create an initial state object initialised with 3 properties corresponding to our 3 situations: eg:

```json
const initialState = {
    isLoading = false ,
    data = {},
    error = {}
}
```

Our reducer will take in some previous state and an action as input and based on the `action.type` it will return a modified version of the old state.

> Note: We should not be mutating the state object.

- If the action type is "Loading" we return the previous state but with the isLoading property as `true`.
- If the action type is "Success" we return the previous state but set our isLoading property as `false` and data as the payload of the action. Also, we should set our error property as an empty object.
- If the action type is "Error" we return the previous state but set isLoaded as `false` and error as our error object which is in `action.payload`. Also, we should set our data property as empty.

Finally we combine our reducers and export it as default in `index.js`
