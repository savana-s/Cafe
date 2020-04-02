var SNAKE = SNAKE || {};
function getHighScore() {
  document.getElementById("high-score").addEventListener("click", function() {
    null == localStorage.jsSnakeHighScore
      ? alert("You have not played this game yet!")
      : alert(
          "Your current high score is " + localStorage.jsSnakeHighScore + "."
        );
  });
}
(SNAKE.addEventListener = window.addEventListener
  ? function(e, t, n, a) {
      e.addEventListener(t, n, a);
    }
  : window.attachEvent
  ? function(e, t, n) {
      e.attachEvent("on" + t, n);
    }
  : void 0),
  (SNAKE.removeEventListener = window.removeEventListener
    ? function(e, t, n, a) {
        e.removeEventListener(t, n, a);
      }
    : window.detachEvent
    ? function(e, t, n) {
        e.detachEvent("on" + t, n);
      }
    : void 0),
  (SNAKE.Snake =
    SNAKE.Snake ||
    (function() {
      var f = [],
        v = function() {
          (this.elm = null),
            (this.elmStyle = null),
            (this.row = -1),
            (this.col = -1),
            (this.xPos = -1e3),
            (this.yPos = -1e3),
            (this.next = null),
            (this.prev = null);
        };
      return function(o) {
        if (o && o.playingBoard) {
          var d = this,
            l = o.playingBoard,
            i = (0, []),
            s = 1,
            r = [0, 1, 0, -1],
            c = [-1, 0, 1, 0],
            u = [],
            h = [],
            k = 75,
            p = !1,
            m = !1;
          e("Easy", 100),
            e("Medium", 75),
            e("Difficult", 50),
            (d.snakeBody = {}),
            (d.snakeBody.b0 = new v()),
            (d.snakeBody.b0.row = o.startRow || 1),
            (d.snakeBody.b0.col = o.startCol || 1),
            (d.snakeBody.b0.xPos = d.snakeBody.b0.row * l.getBlockWidth()),
            (d.snakeBody.b0.yPos = d.snakeBody.b0.col * l.getBlockHeight()),
            (d.snakeBody.b0.elm = g()),
            (d.snakeBody.b0.elmStyle = d.snakeBody.b0.elm.style),
            l.getBoardContainer().appendChild(d.snakeBody.b0.elm),
            (d.snakeBody.b0.elm.style.left = d.snakeBody.b0.xPos + "px"),
            (d.snakeBody.b0.elm.style.top = d.snakeBody.b0.yPos + "px"),
            (d.snakeBody.b0.next = d.snakeBody.b0),
            (d.snakeBody.b0.prev = d.snakeBody.b0),
            (d.snakeLength = 1),
            (d.snakeHead = d.snakeBody.b0),
            (d.snakeTail = d.snakeBody.b0),
            (d.snakeHead.elm.className = d.snakeHead.elm.className.replace(
              /\bsnake-snakebody-dead\b/,
              ""
            )),
            (d.snakeHead.elm.className += " snake-snakebody-alive"),
            (d.setPaused = function(e) {
              m = e;
            }),
            (d.getPaused = function() {
              return m;
            }),
            (d.handleArrowKeys = function(e) {
              if (!p && !m) {
                var t = d.snakeLength,
                  n = i[0] || s;
                switch (e) {
                  case 37:
                  case 65:
                    (1 === n && 1 !== t) || i.unshift(3);
                    break;
                  case 38:
                  case 87:
                    (2 === n && 1 !== t) || i.unshift(0);
                    break;
                  case 39:
                  case 68:
                    (3 === n && 1 !== t) || i.unshift(1);
                    break;
                  case 40:
                  case 83:
                    (0 === n && 1 !== t) || i.unshift(2);
                }
              }
            }),
            (d.go = function() {
              var e = d.snakeHead,
                t = d.snakeTail,
                n = s,
                a = l.grid;
              !0 !== m
                ? ((d.snakeTail = t.prev),
                  a[(d.snakeHead = t).row] &&
                    a[t.row][t.col] &&
                    (a[t.row][t.col] = 0),
                  i.length && (n = s = i.pop()),
                  (t.col = e.col + r[n]),
                  (t.row = e.row + c[n]),
                  (t.xPos = e.xPos + u[n]),
                  (t.yPos = e.yPos + h[n]),
                  t.elmStyle || (t.elmStyle = t.elm.style),
                  (t.elmStyle.left = t.xPos + "px"),
                  (t.elmStyle.top = t.yPos + "px"),
                  0 === a[t.row][t.col]
                    ? ((a[t.row][t.col] = 1),
                      setTimeout(function() {
                        d.go();
                      }, k))
                    : 0 < a[t.row][t.col]
                    ? d.handleDeath()
                    : a[t.row][t.col] === l.getGridFoodValue() &&
                      ((a[t.row][t.col] = 1),
                      d.eatFood(),
                      setTimeout(function() {
                        d.go();
                      }, k)))
                : setTimeout(function() {
                    d.go();
                  }, k);
            }),
            (d.eatFood = function() {
              f.length <= 5 && y(10);
              for (
                var e, t = f.splice(0, 5), n = t.length, a = d.snakeTail;
                n--;

              )
                (e = "b" + d.snakeLength++),
                  (d.snakeBody[e] = t[n]),
                  (d.snakeBody[e].prev = a),
                  (d.snakeBody[
                    e
                  ].elm.className = d.snakeHead.elm.className.replace(
                    /\bsnake-snakebody-dead\b/,
                    ""
                  )),
                  (d.snakeBody[e].elm.className += " snake-snakebody-alive"),
                  (a.next = d.snakeBody[e]),
                  (a = d.snakeBody[e]);
              (d.snakeTail = d.snakeBody[e]),
                (d.snakeTail.next = d.snakeHead),
                (d.snakeHead.prev = d.snakeTail),
                l.foodEaten();
            }),
            (d.handleDeath = function() {
              var e;
              null == (e = localStorage.jsSnakeHighScore) &&
                localStorage.setItem("jsSnakeHighScore", d.snakeLength),
                d.snakeLength > e &&
                  (alert(
                    "Congratulations! You have beaten your previous high score, which was " +
                      e +
                      "."
                  ),
                  localStorage.setItem("jsSnakeHighScore", d.snakeLength)),
                (d.snakeHead.elm.style.zIndex = (function(e) {
                  var t,
                    n = 0,
                    a = 0;
                  for (t in e)
                    e[t].elm.currentStyle
                      ? (a = parseFloat(e[t].elm.style["z-index"], 10))
                      : window.getComputedStyle &&
                        (a = parseFloat(
                          document.defaultView
                            .getComputedStyle(e[t].elm, null)
                            .getPropertyValue("z-index"),
                          10
                        )),
                      !isNaN(a) && n < a && (n = a);
                  return n + 1;
                })(d.snakeBody)),
                (d.snakeHead.elm.className = d.snakeHead.elm.className.replace(
                  /\bsnake-snakebody-alive\b/,
                  ""
                )),
                (d.snakeHead.elm.className += " snake-snakebody-dead"),
                (p = !0),
                l.handleDeath(),
                (i.length = 0);
            }),
            (d.rebirth = function() {
              p = !1;
            }),
            (d.reset = function() {
              if (!1 !== p) {
                for (var e, t = [], n = d.snakeHead.next; n !== d.snakeHead; )
                  (e = n.next),
                    (n.prev = null),
                    (n.next = null),
                    t.push(n),
                    (n = e);
                (d.snakeHead.next = d.snakeHead),
                  (d.snakeHead.prev = d.snakeHead),
                  (d.snakeTail = d.snakeHead),
                  (d.snakeLength = 1);
                for (var a = 0; a < t.length; a++)
                  (t[a].elm.style.left = "-1000px"),
                    (t[a].elm.style.top = "-1000px"),
                    (t[a].elm.className = d.snakeHead.elm.className.replace(
                      /\bsnake-snakebody-dead\b/,
                      ""
                    )),
                    (t[a].elm.className += " snake-snakebody-alive");
                f.concat(t),
                  (d.snakeHead.elm.className = d.snakeHead.elm.className.replace(
                    /\bsnake-snakebody-dead\b/,
                    ""
                  )),
                  (d.snakeHead.elm.className += " snake-snakebody-alive"),
                  (d.snakeHead.row = o.startRow || 1),
                  (d.snakeHead.col = o.startCol || 1),
                  (d.snakeHead.xPos = d.snakeHead.row * l.getBlockWidth()),
                  (d.snakeHead.yPos = d.snakeHead.col * l.getBlockHeight()),
                  (d.snakeHead.elm.style.left = d.snakeHead.xPos + "px"),
                  (d.snakeHead.elm.style.top = d.snakeHead.yPos + "px");
              }
            }),
            y(10),
            (u[0] = 0),
            (u[1] = l.getBlockWidth()),
            (u[2] = 0),
            (u[3] = -1 * l.getBlockWidth()),
            (h[0] = -1 * l.getBlockHeight()),
            (h[1] = 0),
            (h[2] = l.getBlockHeight()),
            (h[3] = 0);
        }
        function e(e, t) {
          document.getElementById(e).addEventListener("click", function() {
            k = t;
          });
        }
        function g() {
          var e = document.createElement("div");
          return (
            (e.className = "snake-snakebody-block"),
            (e.style.left = "-1000px"),
            (e.style.top = "-1000px"),
            (e.style.width = l.getBlockWidth() + "px"),
            (e.style.height = l.getBlockHeight() + "px"),
            e
          );
        }
        function y(e) {
          for (var t, n = g(), a = 1; a < e; a++)
            ((t = new v()).elm = n.cloneNode(!0)),
              (t.elmStyle = t.elm.style),
              l.getBoardContainer().appendChild(t.elm),
              (f[f.length] = t);
          ((t = new v()).elm = n),
            l.getBoardContainer().appendChild(t.elm),
            (f[f.length] = t);
        }
      };
    })()),
  (SNAKE.Food =
    SNAKE.Food ||
    (function() {
      var n = 0;
      function r(e, t) {
        return Math.floor(Math.random() * (t + 1 - e)) + e;
      }
      return function(e) {
        if (e && e.playingBoard) {
          var d,
            l,
            i = e.playingBoard,
            t = n++,
            s = document.createElement("div");
          s.setAttribute("id", "snake-food-" + t),
            (s.className = "snake-food-block"),
            (s.style.width = i.getBlockWidth() + "px"),
            (s.style.height = i.getBlockHeight() + "px"),
            (s.style.left = "-1000px"),
            (s.style.top = "-1000px"),
            i.getBoardContainer().appendChild(s),
            (this.getFoodElement = function() {
              return s;
            }),
            (this.randomlyPlaceFood = function() {
              i.grid[d] &&
                i.grid[d][l] === i.getGridFoodValue() &&
                (i.grid[d][l] = 0);
              for (
                var e = 0,
                  t = 0,
                  n = 0,
                  a = i.grid.length - 1,
                  o = i.grid[0].length - 1;
                0 !== i.grid[e][t];

              )
                if (((e = r(1, a)), (t = r(1, o)), 2e4 < ++n)) {
                  t = e = -1;
                  break;
                }
              (i.grid[e][t] = i.getGridFoodValue()),
                (d = e),
                (l = t),
                (s.style.top = e * i.getBlockHeight() + "px"),
                (s.style.left = t * i.getBlockWidth() + "px");
            });
        }
      };
    })()),
  (SNAKE.Board =
    SNAKE.Board ||
    (function() {
      var i = 0;
      function s(e) {
        var t,
          n = 0,
          a = 0;
        for (t in e)
          e[t].elm.currentStyle
            ? (a = parseFloat(e[t].elm.style["z-index"], 10))
            : window.getComputedStyle &&
              (a = parseFloat(
                document.defaultView
                  .getComputedStyle(e[t].elm, null)
                  .getPropertyValue("z-index"),
                10
              )),
            !isNaN(a) && n < a && (n = a);
        return n + 1;
      }
      return function(e) {
        var m,
          g,
          y,
          f,
          v,
          w,
          B,
          t,
          n,
          a,
          b = this,
          l = i++,
          E = e || {},
          o = 1,
          d = !1;
        function S() {
          (v = document.createElement("div")).setAttribute(
            "id",
            "playingField"
          ),
            (v.className = "snake-playing-field"),
            SNAKE.addEventListener(
              v,
              "click",
              function() {
                f.focus();
              },
              !1
            ),
            ((a = document.createElement("div")).className =
              "snake-pause-screen"),
            (a.innerHTML =
              "<div style='padding:10px;'>[Paused]<p/>Press [space] to unpause.</div>"),
            ((w = document.createElement("div")).className =
              "snake-panel-component"),
            (w.innerHTML =
              "<a href='http://www.savanas.net/' class='snake-link'>more savanas.net apps</a> - <a href='https://github.com/savana-s/Cafe' class='snake-link'>source code</a>"),
            ((B = document.createElement("div")).className =
              "snake-panel-component"),
            (B.innerHTML = "Length: 1"),
            (t = (function() {
              var e = document.createElement("div");
              (e.id = "sbWelcome" + l), (e.className = "snake-welcome-dialog");
              var t = document.createElement("div"),
                n = "";
              E.fullScreen && (n = "Or to play in Full Screen mode.");
              t.innerHTML =
                "Cafe Snake<p></p>Use the <strong>arrow keys</strong> on your keyboard to play the game. " +
                n +
                "<p></p>";
              var a = document.createElement("button");
              a.appendChild(document.createTextNode("Play Game"));
              var o = function() {
                  SNAKE.removeEventListener(window, "keyup", d, !1),
                    (e.style.display = "none"),
                    b.setBoardState(1),
                    b.getBoardContainer().focus();
                },
                d = function(e) {
                  if (!e) var e = window.event;
                  var t = e.which ? e.which : e.keyCode;
                  (32 !== t && 13 !== t) || o();
                };
              return (
                SNAKE.addEventListener(window, "keyup", d, !1),
                SNAKE.addEventListener(a, "click", o, !1),
                e.appendChild(t),
                e.appendChild(a),
                e
              );
            })()),
            (n = (function() {
              var n = document.createElement("div");
              (n.id = "sbTryAgain" + l),
                (n.className = "snake-try-again-dialog");
              var e = document.createElement("div");
              e.innerHTML = "Cafe Snake<p></p>You died :(<p></p>";
              var t = document.createElement("button");
              t.appendChild(document.createTextNode("Play Again?"));
              var a = function() {
                (n.style.display = "none"),
                  b.resetBoard(),
                  b.setBoardState(1),
                  b.getBoardContainer().focus();
              };
              return (
                SNAKE.addEventListener(
                  window,
                  "keyup",
                  function(e) {
                    if (0 === o && "block" === n.style.display) {
                      if (!e) var e = window.event;
                      var t = e.which ? e.which : e.keyCode;
                      (32 !== t && 13 !== t) || a();
                    }
                  },
                  !0
                ),
                SNAKE.addEventListener(t, "click", a, !1),
                n.appendChild(e),
                n.appendChild(t),
                n
              );
            })()),
            SNAKE.addEventListener(
              f,
              "keyup",
              function(e) {
                if (!e) e = window.event;
                return (
                  (e.cancelBubble = !0),
                  e.stopPropagation && e.stopPropagation(),
                  e.preventDefault && e.preventDefault(),
                  !1
                );
              },
              !1
            ),
            (f.className = "snake-game-container"),
            (a.style.zIndex = 1e4),
            f.appendChild(a),
            f.appendChild(v),
            f.appendChild(w),
            f.appendChild(B),
            f.appendChild(t),
            f.appendChild(n),
            (g = new SNAKE.Snake({
              playingBoard: b,
              startRow: 2,
              startCol: 2
            })),
            (m = new SNAKE.Food({ playingBoard: b })),
            (t.style.zIndex = 1e3);
        }
        (b.grid = []),
          (b.setPaused = function(e) {
            (d = e), g.setPaused(e), (a.style.display = d ? "block" : "none");
          }),
          (b.getPaused = function() {
            return d;
          }),
          (b.resetBoard = function() {
            SNAKE.removeEventListener(f, "keydown", y, !1),
              g.reset(),
              (B.innerHTML = "Length: 1"),
              b.setupPlayingField();
          }),
          (b.getBoardState = function() {
            return o;
          }),
          (b.setBoardState = function(e) {
            o = e;
          }),
          (b.getGridFoodValue = function() {
            return -1;
          }),
          (b.getPlayingFieldElement = function() {
            return v;
          }),
          (b.setBoardContainer = function(e) {
            "string" == typeof e && (e = document.getElementById(e)),
              e !== f && ((f = e), (v = null), b.setupPlayingField());
          }),
          (b.getBoardContainer = function() {
            return f;
          }),
          (b.getBlockWidth = function() {
            return 20;
          }),
          (b.getBlockHeight = function() {
            return 20;
          }),
          (b.setupPlayingField = function() {
            var e, t, n, a;
            v || S(),
              !0 === E.fullScreen
                ? ((cTop = 0),
                  (cLeft = 0),
                  (a = 0),
                  "number" == typeof window.innerWidth
                    ? (a = window.innerWidth)
                    : document.documentElement &&
                      (document.documentElement.clientWidth ||
                        document.documentElement.clientHeight)
                    ? (a = document.documentElement.clientWidth)
                    : document.body &&
                      (document.body.clientWidth ||
                        document.body.clientHeight) &&
                      (a = document.body.clientWidth),
                  (e = a - 5),
                  (n = 0),
                  "number" == typeof window.innerHeight
                    ? (n = window.innerHeight)
                    : document.documentElement &&
                      (document.documentElement.clientWidth ||
                        document.documentElement.clientHeight)
                    ? (n = document.documentElement.clientHeight)
                    : document.body &&
                      (document.body.clientWidth ||
                        document.body.clientHeight) &&
                      (n = document.body.clientHeight),
                  (t = n - 5),
                  (document.body.style.backgroundColor = "#FC5454"))
                : ((cTop = E.top),
                  (cLeft = E.left),
                  (e = E.width),
                  (t = E.height));
            var o = 2 * b.getBlockWidth() + (e % b.getBlockWidth()),
              d = Math.min(250 * b.getBlockWidth() - o, e - o),
              l = 3 * b.getBlockHeight() + (t % b.getBlockHeight()),
              i = Math.min(250 * b.getBlockHeight() - l, t - l);
            (f.style.left = cLeft + "px"),
              (f.style.top = cTop + "px"),
              (f.style.width = e + "px"),
              (f.style.height = t + "px"),
              (v.style.left = b.getBlockWidth() + "px"),
              (v.style.top = b.getBlockHeight() + "px"),
              (v.style.width = d + "px"),
              (v.style.height = i + "px");
            var s = l - b.getBlockHeight(),
              r = b.getBlockHeight() + i + Math.round((s - 30) / 2) + "px";
            (w.style.top = r),
              (w.style.width = "450px"),
              (w.style.left = Math.round(e / 2) - Math.round(225) + "px"),
              (B.style.top = r),
              (B.style.left = e - 120 + "px"),
              (w.style.display = e < 700 ? "none" : "block"),
              (b.grid = []);
            for (
              var c = d / b.getBlockWidth() + 2,
                u = i / b.getBlockHeight() + 2,
                h = 0;
              h < u;
              h++
            ) {
              b.grid[h] = [];
              for (var k = 0; k < c; k++)
                b.grid[h][k] =
                  0 === k || 0 === h || k === c - 1 || h === u - 1 ? 1 : 0;
            }
            function p(e, t) {
              document.getElementById(e).addEventListener("click", function() {
                snakeSpeed = t;
              });
            }
            m.randomlyPlaceFood(),
              p("Easy", 100),
              p("Medium", 75),
              p("Difficult", 50),
              (y = function(e) {
                if (!e) e = window.event;
                var t = e.which ? e.which : e.keyCode;
                if (1 === b.getBoardState()) {
                  if (
                    !(37 <= t && t <= 40) &&
                    87 !== t &&
                    65 !== t &&
                    83 !== t &&
                    68 !== t
                  )
                    return;
                  SNAKE.removeEventListener(f, "keydown", y, !1),
                    (y = function(e) {
                      if (!e) e = window.event;
                      var t = e.which ? e.which : e.keyCode;
                      return (
                        32 === t &&
                          0 != b.getBoardState() &&
                          b.setPaused(!b.getPaused()),
                        g.handleArrowKeys(t),
                        (e.cancelBubble = !0),
                        e.stopPropagation && e.stopPropagation(),
                        e.preventDefault && e.preventDefault(),
                        !1
                      );
                    }),
                    SNAKE.addEventListener(f, "keydown", y, !1),
                    g.rebirth(),
                    g.handleArrowKeys(t),
                    b.setBoardState(2),
                    g.go();
                }
                return (
                  (e.cancelBubble = !0),
                  e.stopPropagation && e.stopPropagation(),
                  e.preventDefault && e.preventDefault(),
                  !1
                );
              }),
              SNAKE.addEventListener(f, "keydown", y, !1);
          }),
          (b.foodEaten = function() {
            (B.innerHTML = "Length: " + g.snakeLength), m.randomlyPlaceFood();
          }),
          (b.handleDeath = function() {
            var e = Math.max(
              s(g.snakeBody),
              s({ tmp: { elm: m.getFoodElement() } })
            );
            f.removeChild(n),
              f.appendChild(n),
              (n.style.zIndex = e),
              (n.style.display = "block"),
              b.setBoardState(0);
          }),
          (E.fullScreen = void 0 !== E.fullScreen && E.fullScreen),
          (E.top = void 0 === E.top ? 0 : E.top),
          (E.left = void 0 === E.left ? 0 : E.left),
          (E.width = void 0 === E.width ? 400 : E.width),
          (E.height = void 0 === E.height ? 400 : E.height),
          E.fullScreen &&
            SNAKE.addEventListener(
              window,
              "resize",
              function() {
                b.setupPlayingField();
              },
              !1
            ),
          b.setBoardState(0),
          E.boardContainer && b.setBoardContainer(E.boardContainer);
      };
    })()),
  getHighScore();
