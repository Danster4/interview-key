function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const Wrapper = () => /*#__PURE__*/
React.createElement("div", null, /*#__PURE__*/
React.createElement(Header, null), /*#__PURE__*/
React.createElement(Auth, null));



const Header = () => /*#__PURE__*/
React.createElement("section", { className: "hero is-info is-link" }, /*#__PURE__*/
React.createElement("div", { className: "hero-body" }, /*#__PURE__*/
React.createElement("div", { className: "container" }, /*#__PURE__*/
React.createElement("h1", { className: "title" }, "Interview Key"), /*#__PURE__*/


React.createElement("h2", { className: "subtitle" }, "Track and follow your Interviews"))));

class Auth extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",

    {
      authenticated: false });_defineProperty(this, "loginWithEmailAndPassword",


    () => {this.setState({ authenticated: true });});_defineProperty(this, "loginWithProvider",

    () => {this.setState({ authenticated: true });});_defineProperty(this, "handleClose",

    () => {this.setState({ authenticated: false });});}

  render() {
    return /*#__PURE__*/(
      React.createElement("section", { className: "section" }, /*#__PURE__*/

      //React.createElement("div", { className: "has-text-centered" }, /*#__PURE__*/
      //React.createElement(LoginButton, { icon: "google", name: "Google", onClick: this.loginWithProvider }), /*#__PURE__*/
      //React.createElement(LoginButton, { icon: "twitter", name: "Twitter", onClick: this.loginWithProvider }), /*#__PURE__*/
      //React.createElement(LoginButton, { icon: "facebook", name: "Facebook", onClick: this.loginWithProvider })), /*#__PURE__*/


      //React.createElement("div", { className: "has-text-centered", style: { margin: '10px 0' } }, /*#__PURE__*/
      //React.createElement("hr", null), /*#__PURE__*/
      //React.createElement("span", { style: { verticalAlign: 'middle', padding: '0 10px' } }, "OR"), /*#__PURE__*/
      //React.createElement("hr", null)), /*#__PURE__*/


      React.createElement(LoginForm, { handleSubmit: this.loginWithEmailAndPassword }), /*#__PURE__*/

      React.createElement(SignInSuccess, { active: this.state.authenticated, handleClose: this.handleClose })));



  }}


const LoginButton = ({ icon, name, onClick }) => /*#__PURE__*/
React.createElement("div", { className: "field" }, /*#__PURE__*/
React.createElement("p", { className: "control button is-medium is-link", style: { width: '300px' }, onClick: onClick }, /*#__PURE__*/
React.createElement("span", { className: "icon" }, /*#__PURE__*/
React.createElement("i", { className: `fa fa-${icon}`, "aria-hidden": "true" })), /*#__PURE__*/

React.createElement("span", null, `Sign In With ${name}`)));




class LoginForm extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",

    {
      email: null,
      password: null });_defineProperty(this, "handleChange",


    event => this.setState({ [event.target.name]: event.target.value }));_defineProperty(this, "handleSubmit",

    () => this.props.handleSubmit(this.state));}

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "container has-text-centered box", style: { maxWidth: '300px' } }, /*#__PURE__*/
      React.createElement("form", {
        onSubmit: e => {
          e.preventDefault();
          this.handleSubmit();
        } }, /*#__PURE__*/
      React.createElement("div", { className: "field" }, /*#__PURE__*/
      React.createElement("label", { className: "label", htmlFor: "email" }, "Email"), /*#__PURE__*/
      React.createElement("div", { className: "control" }, /*#__PURE__*/
      React.createElement("input", { className: "input", name: "email", type: "email", placeholder: "email", required: true, onChange: this.handleChange }))), /*#__PURE__*/



      React.createElement("div", { className: "field" }, /*#__PURE__*/
      React.createElement("label", { className: "label", htmlFor: "password" }, "Password"), /*#__PURE__*/
      React.createElement("div", { className: "control" }, /*#__PURE__*/
      React.createElement("input", { className: "input", name: "password", type: "password", placeholder: "password", required: true, onChange: this.handleChange }))), /*#__PURE__*/



      React.createElement("div", { className: "field" }, /*#__PURE__*/
      React.createElement("div", { className: "control buttons is-centered" }, /*#__PURE__*/
      React.createElement("input", { className: "button is-medium is-link is-fullwidth", type: "submit", value: "Sign In" }))))));





  }}


const SignInSuccess = ({ active, handleClose }) => /*#__PURE__*/
React.createElement("div", { className: `modal ${active && 'is-active'}` }, /*#__PURE__*/
React.createElement("div", { className: "modal-background", onClick: handleClose }), /*#__PURE__*/
React.createElement("div", { className: "modal-content" }, /*#__PURE__*/
React.createElement("div", { className: "notification is-success has-text-centered" }, /*#__PURE__*/
React.createElement("button", { className: "delete", onClick: handleClose }), /*#__PURE__*/
React.createElement("p", null, /*#__PURE__*/
React.createElement("span", { className: "icon is-large" }, /*#__PURE__*/
React.createElement("i", { className: "fa fa-check-square fa-2x" })), /*#__PURE__*/

React.createElement("span", { className: "title" }, " Sign In Succesful!")))));







ReactDOM.render( /*#__PURE__*/React.createElement(Wrapper, null), document.getElementById('root'));