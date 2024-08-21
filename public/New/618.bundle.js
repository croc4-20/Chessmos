"use strict";(self.webpackChunkchessmos=self.webpackChunkchessmos||[]).push([[618],{7618:(e,t,r)=>{function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function i(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,a(n.key),n)}}function a(e){var t=function(e){if("object"!=n(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var r=t.call(e,"string");if("object"!=n(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==n(t)?t:t+""}r.r(t),r.d(t,{default:()=>s});var s=function(){return e=function e(t,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.pieceTypes=["pawn","knight","bishop","rook","queen","king"],this.pieceColors=["white","black"],this.pieces=[],this.game=t,this.ChessBoard=r},(t=[{key:"createChessBoard",value:function(){var e=document.getElementById("board");return new this.ChessBoard(this.game,e)}},{key:"createPieces",value:function(e){var t,r={white:[0,1],black:[6,7]},n=["rook","knight","bishop","queen","king","bishop","knight","rook"],i=(this.createChessBoard(),function(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return o(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?o(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,i=function(){};return{s:i,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,s=!0,c=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return s=e.done,e},e:function(e){c=!0,a=e},f:function(){try{s||null==r.return||r.return()}finally{if(c)throw a}}}}(this.pieceColors));try{for(i.s();!(t=i.n()).done;){for(var a=t.value,s=0;s<n.length;s++){var c=n[s],u=r[a][0],l=s,f="images/".concat(a.toUpperCase(),"_").concat(c.toUpperCase(),".png");switch(c){case"rook":case"knight":case"bishop":case"queen":case"king":case"pawn":new ChessPiece(c,a,u,l,f,null,this.game);break;default:throw new Error("Invalid piece type: ".concat(c))}this.pieces.push(void 0)}for(var h=r[a][1],p=0;p<8;p++){var y="images/".concat(a.toUpperCase(),"_PAWN.png"),b=new ChessPiece("pawn",a,h,p,y,null,this.game);this.pieces.push(b)}}}catch(e){i.e(e)}finally{i.f()}}}])&&i(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,t}()}}]);
//# sourceMappingURL=618.bundle.js.map