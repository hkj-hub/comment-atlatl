import '@testing-library/jest-dom'; // 指定を忘れると、expect(...).toBeInTheDocument is not a function のエラーが発生
import '@testing-library/jest-dom/extend-expect'; // https://nextjs.org/docs/pages/building-your-application/optimizing/testing#jest-and-react-testing-library

// rapierの代用にrapier2d-compatを使ったら「 TextDecoder is not defined 」が出たため下記対応
// https://zenn.dev/ocknamo/scraps/f0de16520e7117
// Polyfill for encoding which isn't present globally in jsdom
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = require('util').TextDecoder;
}
