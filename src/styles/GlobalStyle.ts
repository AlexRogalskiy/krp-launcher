import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #E1E1E6;
  }

  @charset "UTF-8";
@font-face {
  font-family: 'Notification';
  src: url("./fonts/notification.eot?s3g3t9");
  src: url("./fonts/notification.eot?#iefixs3g3t9") format("embedded-opentype"), url("./fonts/notification.woff?s3g3t9") format("woff"), url("./fonts/notification.ttf?s3g3t9") format("truetype"), url("./fonts/notification.svg?s3g3t9#notification") format("svg");
  font-weight: normal;
  font-style: normal;
}

.notification-container {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999999;
  width: 320px;
  padding: 0px 15px;
  max-height: calc(100% - 30px);
  overflow-x: hidden;
  overflow-y: auto;
}

.notification {
  box-sizing: border-box;
  padding: 15px 15px 15px 58px;
  border-radius: 2px;
  color: #fff;
  background-color: #ccc;
  box-shadow: 0 0 12px #999;
  cursor: pointer;
  font-size: 1em;
  line-height: 1.2em;
  position: relative;
  opacity: 0.9;
  margin-top: 15px;
}

.notification .title {
  font-size: 1em;
  line-height: 1.2em;
  font-weight: bold;
  margin: 0 0 5px 0;
}

.notification:hover, .notification:focus {
  opacity: 1;
}

.notification-enter {
  visibility: hidden;
  transform: translate3d(100%, 0, 0);
}

.notification-enter.notification-enter-active {
  visibility: visible;
  transform: translate3d(0, 0, 0);
  transition: all 0.4s;
}

.notification-leave {
  visibility: visible;
  transform: translate3d(0, 0, 0);
}

.notification-leave.notification-leave-active {
  visibility: hidden;
  transform: translate3d(100%, 0, 0);
  transition: all 0.4s;
}

.notification:before {
  position: absolute;
  top: 50%;
  left: 15px;
  margin-top: -14px;
  display: block;
  font-family: 'Notification';
  width: 28px;
  height: 28px;
  font-size: 28px;
  text-align: center;
  line-height: 28px;
}

.notification-info {
  background-color: #2f96b4;
}

.notification-info:before {
  content: "";
}

.notification-success {
  background-color: #51a351;
}

.notification-success:before {
  content: "";
}

.notification-warning {
  background-color: #f89406;
}

.notification-warning:before {
  content: "";
}

.notification-error {
  background-color: #bd362f;
}

.notification-error:before {
  content: "";
}
`
