var currentScreenSize = $(window);
var currentLanguage = $("html").attr("lang");

// rwd menu – jedna instancja, jeden breakpoint 1340px
!(function (e) {
  var BREAKPOINT = 1340;

  e.fn.menumaker = function (s) {
    var t = e(this),
      n = e.extend(
        {
          title: "Menu",
          format: "dropdown",
          breakpoint: BREAKPOINT,
          sticky: false,
        },
        s,
      );

    return this.each(function () {
      t.find("li ul").parent().addClass("has-sub");

      if ("select" !== n.format) {
        t.prepend(
          '<div id="menu-button"><span class="menu-button-text">' +
            n.title +
            "</span></div>",
        );

        e(this)
          .find("#menu-button")
          .on("click", function () {
            e(this).toggleClass("menu-opened");
            e("#header").toggleClass("menu-open");
            var s = e(this).next("ul");
            s.hasClass("open")
              ? s.hide("fast").removeClass("open")
              : (s.show("fast").addClass("open"),
                "dropdown" === n.format && s.find("ul").show("fast"));
          });

        var multiTg = function () {
          t.find(".has-sub").prepend('<span class="submenu-button"></span>');
          t.find(".submenu-button").on("click", function () {
            e(this).toggleClass("submenu-opened");
            e(this).siblings("ul").hasClass("open")
              ? e(this).siblings("ul").removeClass("open").hide("fast")
              : e(this).siblings("ul").addClass("open").show("fast");
          });
        };

        "multitoggle" === n.format ? multiTg() : t.addClass("dropdown");
      } else {
        t.append('<select style="width: 100%"/>').addClass("select-list");
        var sel = t.find("select");
        sel.append("<option>" + n.title + "</option>", {
          selected: "selected",
          value: "",
        });
        t.find("a").each(function () {
          var anchor = e(this),
            dashes = "";
          for (var i = 1; i < anchor.parents("ul").length; i++) dashes += "-";
          sel.append(
            '<option value="' +
              e(this).attr("href") +
              '">' +
              dashes +
              anchor.text() +
              "</option>",
          );
        });
        sel.on("change", function () {
          window.location = e(this).find("option:selected").val();
        });
      }

      if (true === n.sticky) t.css("position", "fixed");

      var resizeFix = function () {
        var w = e(window).width();
        if (w > n.breakpoint) {
          // powrót do widoku desktopowego – usuwamy style inline, CSS przejmuje kontrolę
          t.find("ul").css("display", "").removeClass("open");
          t.removeClass("mobile-view");
          e("#header").removeClass("menu-open");
          if ("select" === n.format) {
            t.find("select").hide("fast");
          } else {
            t.find("#menu-button").removeClass("menu-opened");
          }
        } else if (!t.hasClass("mobile-view")) {
          // wejście w widok mobilny/tabletowy
          t.find("ul").hide("fast").removeClass("open");
          t.addClass("mobile-view");
          if ("select" === n.format) t.find("select").show("fast");
        }
      };


      resizeFix();

      var resizeTimer;
      e(window).on("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeFix, 100);
      });
    });
  };

  e("#rwd-nav").menumaker({
    title: "Menu",
    format: "multitoggle",
  });
})(jQuery);

// cookies js
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
      ? define(t)
      : ((e = e || self),
        (function () {
          var n = e.Cookies,
            o = (e.Cookies = t());
          o.noConflict = function () {
            return ((e.Cookies = n), o);
          };
        })());
})(this, function () {
  "use strict";
  function e(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var o in n) e[o] = n[o];
    }
    return e;
  }
  return (function t(n, o) {
    function r(t, r, i) {
      if ("undefined" != typeof document) {
        ("number" == typeof (i = e({}, o, i)).expires &&
          (i.expires = new Date(Date.now() + 864e5 * i.expires)),
          i.expires && (i.expires = i.expires.toUTCString()),
          (t = encodeURIComponent(t)
            .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
            .replace(/[()]/g, escape)));
        var c = "";
        for (var u in i)
          i[u] &&
            ((c += "; " + u), !0 !== i[u] && (c += "=" + i[u].split(";")[0]));
        return (document.cookie = t + "=" + n.write(r, t) + c);
      }
    }
    return Object.create(
      {
        set: r,
        get: function (e) {
          if ("undefined" != typeof document && (!arguments.length || e)) {
            for (
              var t = document.cookie ? document.cookie.split("; ") : [],
                o = {},
                r = 0;
              r < t.length;
              r++
            ) {
              var i = t[r].split("="),
                c = i.slice(1).join("=");
              try {
                var u = decodeURIComponent(i[0]);
                if (((o[u] = n.read(c, u)), e === u)) break;
              } catch (e) {}
            }
            return e ? o[e] : o;
          }
        },
        remove: function (t, n) {
          r(t, "", e({}, n, { expires: -1 }));
        },
        withAttributes: function (n) {
          return t(this.converter, e({}, this.attributes, n));
        },
        withConverter: function (n) {
          return t(e({}, this.converter, n), this.attributes);
        },
      },
      {
        attributes: { value: Object.freeze(o) },
        converter: { value: Object.freeze(n) },
      },
    );
  })(
    {
      read: function (e) {
        return (
          '"' === e[0] && (e = e.slice(1, -1)),
          e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
        );
      },
      write: function (e) {
        return encodeURIComponent(e).replace(
          /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
          decodeURIComponent,
        );
      },
    },
    { path: "/" },
  );
});

/* rebuild select */
var e;
(e = jQuery).fn.rebuildSelect = function (t) {
  if ("string" == typeof t)
    return (
      "update" == t
        ? this.each(function () {
            var t = e(this),
              l = e(this).next(".rebuild-select"),
              i = l.hasClass("open");
            l.length && (l.remove(), s(t), i && t.next().trigger("click"));
          })
        : "destroy" == t
          ? (this.each(function () {
              var t = e(this),
                s = e(this).next(".rebuild-select");
              s.length && (s.remove(), t.css("display", ""));
            }),
            0 == e(".rebuild-select").length &&
              e(document).off(".rebuild_select"))
          : console.log('Method "' + t + '" does not exist.'),
      this
    );
  function s(t) {
    t.after(
      e("<div></div>")
        .addClass("rebuild-select")
        .addClass(t.attr("class") || "")
        .addClass(t.attr("disabled") ? "disabled" : "")
        .attr("tabindex", t.attr("disabled") ? null : "0")
        .html('<span class="current"></span><ul class="list"></ul>'),
    );
    var s = t.next(),
      l = t.find("option"),
      i = t.find("option:selected");
    (s.find(".current").html(i.data("display") || i.text()),
      l.each(function (t) {
        var l = e(this),
          i = l.data("display");
        s.find("ul").append(
          e("<li></li>")
            .attr("data-value", l.val())
            .attr("data-display", i || null)
            .addClass(
              "option" +
                (l.is(":selected") ? " selected" : "") +
                (l.is(":disabled") ? " disabled" : ""),
            )
            .html(l.text()),
        );
      }));
  }
  (this.hide(),
    this.each(function () {
      var t = e(this);
      t.next().hasClass("rebuild-select") || s(t);
    }),
    e(document).off(".rebuild_select"),
    e(document).on("click.rebuild_select", ".rebuild-select", function (t) {
      var s = e(this);
      (e(".rebuild-select").not(s).removeClass("open"),
        s.toggleClass("open"),
        s.hasClass("open")
          ? (s.find(".option"),
            s.find(".focus").removeClass("focus"),
            s.find(".selected").addClass("focus"))
          : s.focus());
    }),
    e(document).on("click.rebuild_select", function (t) {
      0 === e(t.target).closest(".rebuild-select").length &&
        e(".rebuild-select").removeClass("open").find(".option");
    }),
    e(document).on(
      "click.rebuild_select",
      ".rebuild-select .option:not(.disabled)",
      function (t) {
        var s = e(this),
          l = s.closest(".rebuild-select");
        (l.find(".selected").removeClass("selected"), s.addClass("selected"));
        var i = s.data("display") || s.text();
        (l.find(".current").text(i),
          l.prev("select").val(s.data("value")).trigger("change"));
      },
    ),
    e(document).on("keydown.rebuild_select", ".rebuild-select", function (t) {
      var s = e(this),
        l = e(s.find(".focus") || s.find(".list .option.selected"));
      if (32 == t.keyCode || 13 == t.keyCode)
        return (
          s.hasClass("open") ? l.trigger("click") : s.trigger("click"),
          !1
        );
      if (40 == t.keyCode) {
        if (s.hasClass("open")) {
          var i = l.nextAll(".option:not(.disabled)").first();
          i.length > 0 &&
            (s.find(".focus").removeClass("focus"), i.addClass("focus"));
        } else s.trigger("click");
        return !1;
      }
      if (38 == t.keyCode) {
        if (s.hasClass("open")) {
          var d = l.prevAll(".option:not(.disabled)").first();
          d.length > 0 &&
            (s.find(".focus").removeClass("focus"), d.addClass("focus"));
        } else s.trigger("click");
        return !1;
      }
      if (27 == t.keyCode) s.hasClass("open") && s.trigger("click");
      else if (9 == t.keyCode && s.hasClass("open")) return !1;
    }));
  var l = document.createElement("a").style;
  return (
    (l.cssText = "pointer-events:auto"),
    "auto" !== l.pointerEvents && e("html").addClass("no-csspointerevents"),
    this
  );
};

// top text block
if (Cookies.get("top_baner_block")) {
  //console.log('cookie banner: ' + Cookies.get('top_baner_block'));
  if (Cookies.get("top_baner_block") == "hidden") {
    //$('#top-bar').css('display', 'none');
    $("#top-bar").remove();
  }
} else {
  $("#top-bar").addClass("visible");
}

if ($("#top-bar").length > 0) {
  $(".top-block").addClass("tb-info-block");
  $(
    '<span class="tb-close-btn" id="tb-close-btn"><svg xmlns="http://www.w3.org/2000/svg" width="13.086" height="13.086" viewBox="0 0 13.086 13.086"><g id="close_svg" data-name="" transform="translate(-1887.793 -11.793)"><line id="Line_148" data-name="Line 148" x1="11.672" y1="11.672" transform="translate(1888.5 12.5)" fill="none" stroke="#fff" stroke-width="2"/><line id="Line_149" data-name="Line 149" y1="11.672" x2="11.672" transform="translate(1888.5 12.5)" fill="none" stroke="#fff" stroke-width="2"/></g></svg></span>',
  ).insertAfter(".tb-info-block p");
  $("#tb-close-btn").click(function () {
    $("#top-bar").css("display", "none");
    Cookies.set("top_baner_block", "hidden", { expires: 1 });
  });
}

// Waypoints - 4.0.1
(!(function () {
  "use strict";
  function t(o) {
    if (!o) throw new Error("No options passed to Waypoint constructor");
    if (!o.element)
      throw new Error("No element option passed to Waypoint constructor");
    if (!o.handler)
      throw new Error("No handler option passed to Waypoint constructor");
    ((this.key = "waypoint-" + e),
      (this.options = t.Adapter.extend({}, t.defaults, o)),
      (this.element = this.options.element),
      (this.adapter = new t.Adapter(this.element)),
      (this.callback = o.handler),
      (this.axis = this.options.horizontal ? "horizontal" : "vertical"),
      (this.enabled = this.options.enabled),
      (this.triggerPoint = null),
      (this.group = t.Group.findOrCreate({
        name: this.options.group,
        axis: this.axis,
      })),
      (this.context = t.Context.findOrCreateByElement(this.options.context)),
      t.offsetAliases[this.options.offset] &&
        (this.options.offset = t.offsetAliases[this.options.offset]),
      this.group.add(this),
      this.context.add(this),
      (i[this.key] = this),
      (e += 1));
  }
  var e = 0,
    i = {};
  ((t.prototype.queueTrigger = function (t) {
    this.group.queueTrigger(this, t);
  }),
    (t.prototype.trigger = function (t) {
      this.enabled && this.callback && this.callback.apply(this, t);
    }),
    (t.prototype.destroy = function () {
      (this.context.remove(this), this.group.remove(this), delete i[this.key]);
    }),
    (t.prototype.disable = function () {
      return ((this.enabled = !1), this);
    }),
    (t.prototype.enable = function () {
      return (this.context.refresh(), (this.enabled = !0), this);
    }),
    (t.prototype.next = function () {
      return this.group.next(this);
    }),
    (t.prototype.previous = function () {
      return this.group.previous(this);
    }),
    (t.invokeAll = function (t) {
      var e = [];
      for (var o in i) e.push(i[o]);
      for (var n = 0, r = e.length; r > n; n++) e[n][t]();
    }),
    (t.destroyAll = function () {
      t.invokeAll("destroy");
    }),
    (t.disableAll = function () {
      t.invokeAll("disable");
    }),
    (t.enableAll = function () {
      t.Context.refreshAll();
      for (var e in i) i[e].enabled = !0;
      return this;
    }),
    (t.refreshAll = function () {
      t.Context.refreshAll();
    }),
    (t.viewportHeight = function () {
      return window.innerHeight || document.documentElement.clientHeight;
    }),
    (t.viewportWidth = function () {
      return document.documentElement.clientWidth;
    }),
    (t.adapters = []),
    (t.defaults = {
      context: window,
      continuous: !0,
      enabled: !0,
      group: "default",
      horizontal: !1,
      offset: 0,
    }),
    (t.offsetAliases = {
      "bottom-in-view": function () {
        return this.context.innerHeight() - this.adapter.outerHeight();
      },
      "right-in-view": function () {
        return this.context.innerWidth() - this.adapter.outerWidth();
      },
    }),
    (window.Waypoint = t));
})(),
  (function () {
    "use strict";
    function t(t) {
      window.setTimeout(t, 1e3 / 60);
    }
    function e(t) {
      ((this.element = t),
        (this.Adapter = n.Adapter),
        (this.adapter = new this.Adapter(t)),
        (this.key = "waypoint-context-" + i),
        (this.didScroll = !1),
        (this.didResize = !1),
        (this.oldScroll = {
          x: this.adapter.scrollLeft(),
          y: this.adapter.scrollTop(),
        }),
        (this.waypoints = { vertical: {}, horizontal: {} }),
        (t.waypointContextKey = this.key),
        (o[t.waypointContextKey] = this),
        (i += 1),
        n.windowContext ||
          ((n.windowContext = !0), (n.windowContext = new e(window))),
        this.createThrottledScrollHandler(),
        this.createThrottledResizeHandler());
    }
    var i = 0,
      o = {},
      n = window.Waypoint,
      r = window.onload;
    ((e.prototype.add = function (t) {
      var e = t.options.horizontal ? "horizontal" : "vertical";
      ((this.waypoints[e][t.key] = t), this.refresh());
    }),
      (e.prototype.checkEmpty = function () {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
          e = this.Adapter.isEmptyObject(this.waypoints.vertical),
          i = this.element == this.element.window;
        t && e && !i && (this.adapter.off(".waypoints"), delete o[this.key]);
      }),
      (e.prototype.createThrottledResizeHandler = function () {
        function t() {
          (e.handleResize(), (e.didResize = !1));
        }
        var e = this;
        this.adapter.on("resize.waypoints", function () {
          e.didResize || ((e.didResize = !0), n.requestAnimationFrame(t));
        });
      }),
      (e.prototype.createThrottledScrollHandler = function () {
        function t() {
          (e.handleScroll(), (e.didScroll = !1));
        }
        var e = this;
        this.adapter.on("scroll.waypoints", function () {
          (!e.didScroll || n.isTouch) &&
            ((e.didScroll = !0), n.requestAnimationFrame(t));
        });
      }),
      (e.prototype.handleResize = function () {
        n.Context.refreshAll();
      }),
      (e.prototype.handleScroll = function () {
        var t = {},
          e = {
            horizontal: {
              newScroll: this.adapter.scrollLeft(),
              oldScroll: this.oldScroll.x,
              forward: "right",
              backward: "left",
            },
            vertical: {
              newScroll: this.adapter.scrollTop(),
              oldScroll: this.oldScroll.y,
              forward: "down",
              backward: "up",
            },
          };
        for (var i in e) {
          var o = e[i],
            n = o.newScroll > o.oldScroll,
            r = n ? o.forward : o.backward;
          for (var s in this.waypoints[i]) {
            var a = this.waypoints[i][s];
            if (null !== a.triggerPoint) {
              var l = o.oldScroll < a.triggerPoint,
                h = o.newScroll >= a.triggerPoint,
                p = l && h,
                u = !l && !h;
              (p || u) && (a.queueTrigger(r), (t[a.group.id] = a.group));
            }
          }
        }
        for (var c in t) t[c].flushTriggers();
        this.oldScroll = { x: e.horizontal.newScroll, y: e.vertical.newScroll };
      }),
      (e.prototype.innerHeight = function () {
        return this.element == this.element.window
          ? n.viewportHeight()
          : this.adapter.innerHeight();
      }),
      (e.prototype.remove = function (t) {
        (delete this.waypoints[t.axis][t.key], this.checkEmpty());
      }),
      (e.prototype.innerWidth = function () {
        return this.element == this.element.window
          ? n.viewportWidth()
          : this.adapter.innerWidth();
      }),
      (e.prototype.destroy = function () {
        var t = [];
        for (var e in this.waypoints)
          for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
        for (var o = 0, n = t.length; n > o; o++) t[o].destroy();
      }),
      (e.prototype.refresh = function () {
        var t,
          e = this.element == this.element.window,
          i = e ? void 0 : this.adapter.offset(),
          o = {};
        (this.handleScroll(),
          (t = {
            horizontal: {
              contextOffset: e ? 0 : i.left,
              contextScroll: e ? 0 : this.oldScroll.x,
              contextDimension: this.innerWidth(),
              oldScroll: this.oldScroll.x,
              forward: "right",
              backward: "left",
              offsetProp: "left",
            },
            vertical: {
              contextOffset: e ? 0 : i.top,
              contextScroll: e ? 0 : this.oldScroll.y,
              contextDimension: this.innerHeight(),
              oldScroll: this.oldScroll.y,
              forward: "down",
              backward: "up",
              offsetProp: "top",
            },
          }));
        for (var r in t) {
          var s = t[r];
          for (var a in this.waypoints[r]) {
            var l,
              h,
              p,
              u,
              c,
              d = this.waypoints[r][a],
              f = d.options.offset,
              w = d.triggerPoint,
              y = 0,
              g = null == w;
            (d.element !== d.element.window &&
              (y = d.adapter.offset()[s.offsetProp]),
              "function" == typeof f
                ? (f = f.apply(d))
                : "string" == typeof f &&
                  ((f = parseFloat(f)),
                  d.options.offset.indexOf("%") > -1 &&
                    (f = Math.ceil((s.contextDimension * f) / 100))),
              (l = s.contextScroll - s.contextOffset),
              (d.triggerPoint = Math.floor(y + l - f)),
              (h = w < s.oldScroll),
              (p = d.triggerPoint >= s.oldScroll),
              (u = h && p),
              (c = !h && !p),
              !g && u
                ? (d.queueTrigger(s.backward), (o[d.group.id] = d.group))
                : !g && c
                  ? (d.queueTrigger(s.forward), (o[d.group.id] = d.group))
                  : g &&
                    s.oldScroll >= d.triggerPoint &&
                    (d.queueTrigger(s.forward), (o[d.group.id] = d.group)));
          }
        }
        return (
          n.requestAnimationFrame(function () {
            for (var t in o) o[t].flushTriggers();
          }),
          this
        );
      }),
      (e.findOrCreateByElement = function (t) {
        return e.findByElement(t) || new e(t);
      }),
      (e.refreshAll = function () {
        for (var t in o) o[t].refresh();
      }),
      (e.findByElement = function (t) {
        return o[t.waypointContextKey];
      }),
      (window.onload = function () {
        (r && r(), e.refreshAll());
      }),
      (n.requestAnimationFrame = function (e) {
        var i =
          window.requestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          t;
        i.call(window, e);
      }),
      (n.Context = e));
  })(),
  (function () {
    "use strict";
    function t(t, e) {
      return t.triggerPoint - e.triggerPoint;
    }
    function e(t, e) {
      return e.triggerPoint - t.triggerPoint;
    }
    function i(t) {
      ((this.name = t.name),
        (this.axis = t.axis),
        (this.id = this.name + "-" + this.axis),
        (this.waypoints = []),
        this.clearTriggerQueues(),
        (o[this.axis][this.name] = this));
    }
    var o = { vertical: {}, horizontal: {} },
      n = window.Waypoint;
    ((i.prototype.add = function (t) {
      this.waypoints.push(t);
    }),
      (i.prototype.clearTriggerQueues = function () {
        this.triggerQueues = { up: [], down: [], left: [], right: [] };
      }),
      (i.prototype.flushTriggers = function () {
        for (var i in this.triggerQueues) {
          var o = this.triggerQueues[i],
            n = "up" === i || "left" === i;
          o.sort(n ? e : t);
          for (var r = 0, s = o.length; s > r; r += 1) {
            var a = o[r];
            (a.options.continuous || r === o.length - 1) && a.trigger([i]);
          }
        }
        this.clearTriggerQueues();
      }),
      (i.prototype.next = function (e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints),
          o = i === this.waypoints.length - 1;
        return o ? null : this.waypoints[i + 1];
      }),
      (i.prototype.previous = function (e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints);
        return i ? this.waypoints[i - 1] : null;
      }),
      (i.prototype.queueTrigger = function (t, e) {
        this.triggerQueues[e].push(t);
      }),
      (i.prototype.remove = function (t) {
        var e = n.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1);
      }),
      (i.prototype.first = function () {
        return this.waypoints[0];
      }),
      (i.prototype.last = function () {
        return this.waypoints[this.waypoints.length - 1];
      }),
      (i.findOrCreate = function (t) {
        return o[t.axis][t.name] || new i(t);
      }),
      (n.Group = i));
  })(),
  (function () {
    "use strict";
    function t(t) {
      this.$element = e(t);
    }
    var e = window.jQuery,
      i = window.Waypoint;
    (e.each(
      [
        "innerHeight",
        "innerWidth",
        "off",
        "offset",
        "on",
        "outerHeight",
        "outerWidth",
        "scrollLeft",
        "scrollTop",
      ],
      function (e, i) {
        t.prototype[i] = function () {
          var t = Array.prototype.slice.call(arguments);
          return this.$element[i].apply(this.$element, t);
        };
      },
    ),
      e.each(["extend", "inArray", "isEmptyObject"], function (i, o) {
        t[o] = e[o];
      }),
      i.adapters.push({ name: "jquery", Adapter: t }),
      (i.Adapter = t));
  })(),
  (function () {
    "use strict";
    function t(t) {
      return function () {
        var i = [],
          o = arguments[0];
        return (
          t.isFunction(arguments[0]) &&
            ((o = t.extend({}, arguments[1])), (o.handler = arguments[0])),
          this.each(function () {
            var n = t.extend({}, o, { element: this });
            ("string" == typeof n.context &&
              (n.context = t(this).closest(n.context)[0]),
              i.push(new e(n)));
          }),
          i
        );
      };
    }
    var e = window.Waypoint;
    (window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)),
      window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto)));
  })());


(function ($) {
  var DESKTOP_BREAKPOINT = 1340;

  function isDesktopMenu() {
    return $(window).width() > DESKTOP_BREAKPOINT;
  }

  function syncHeaderSubmenuState() {
    var $header = $("#header");
    var $openItems = $("#rwd-nav > ul > li.has-sub:hover");
    $header.toggleClass("submenu-open", isDesktopMenu() && $openItems.length > 0);
  }

  $(document).on(
    "mouseenter focusin",
    "#rwd-nav > ul > li.has-sub",
    function () {
      if (!isDesktopMenu()) return;
      $("#header").addClass("submenu-open");
    },
  );

  $(document).on(
    "mouseleave focusout",
    "#rwd-nav > ul > li.has-sub",
    function () {
      if (!isDesktopMenu()) return;
      // Run after focus settles so moving focus inside submenu doesn't close state.
      requestAnimationFrame(syncHeaderSubmenuState);
    },
  );

  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      $("#header").removeClass("submenu-open");
    }
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest("#rwd-nav").length) {
      $("#header").removeClass("submenu-open");
    }
  });

  $(window).on("resize", function () {
    if (!isDesktopMenu()) {
      $("#header").removeClass("submenu-open");
      return;
    }
    syncHeaderSubmenuState();
  });
})(jQuery);

// theme styles change with cookie save selection

var themeButtonBlock = $("#theme-button");
var themeButtonChange = $("#theme-default");
var themeMapSelect = $("#map-style-selector");

if (Cookies.get("selected_theme")) {
  console.log("cookie loaded theme: " + Cookies.get("selected_theme"));
}

if (Cookies.get("selected_theme") == "light_theme") {
  //console.log('if cookie == light theme');
  $("body").removeClass("dark-theme");
  $(themeButtonChange).removeClass("theme-dark-on");
  $("body").addClass("light-theme");
  $(themeButtonChange).addClass("theme-light-on");
} else if (Cookies.get("selected_theme") == "dark_theme") {
  //console.log('if cookie == dark theme');
  $("body").removeClass("light-theme");
  $(themeButtonChange).removeClass("theme-light-on");
  $("body").addClass("dark-theme");
  $(themeButtonChange).addClass("theme-dark-on");
} else {
  Cookies.set("selected_theme", "light_theme");
  $("body").addClass("light-theme");
  $(themeButtonChange).addClass("theme-light-on");
}

$(themeButtonBlock).click(function () {
  if ($(themeButtonChange).hasClass("theme-dark-on")) {
    Cookies.set("selected_theme", "light_theme");
    console.log("selected theme: " + Cookies.get("selected_theme"));
    $("body").removeClass("dark-theme");
    $(themeButtonChange).removeClass("theme-dark-on");
    $("body").addClass("light-theme");
    $(themeButtonChange).addClass("theme-light-on");
  } else if ($(themeButtonChange).hasClass("theme-light-on")) {
    Cookies.set("selected_theme", "dark_theme");
    console.log("selected theme: " + Cookies.get("selected_theme"));
    //  $(this).html($(this).html().split(": (wybierz)").join(""));
    $("body").removeClass("light-theme");
    $(themeButtonChange).removeClass("theme-light-on");
    $("body").addClass("dark-theme");
    $(themeButtonChange).addClass("theme-dark-on");
  }
});



// ─── Custom file input (cross-browser, fixes Safari) ────────────────────────
// Wraps every .add-file input in a flex container that shows the upload icon
// and the selected filename. The real <input> is transparent and covers the
// entire wrapper so the OS file-picker opens on any click or tap.
// Must be defined before $(document).ready so wpcf7 events can also call it.
function initCustomFileInputs() {
  $(".application-form-block .add-file").each(function () {
    var $input = $(this);
    if ($input.parent().hasClass("custom-file-input-wrapper")) return;

    var $wrapper = $(
      '<div class="custom-file-input-wrapper" role="button" tabindex="0" aria-label="Wybierz plik"></div>',
    );
    var $icon = $('<span class="cfi-icon" aria-hidden="true"></span>');
    var $label = $('<span class="cfi-label">Nie wybrano pliku</span>');

    $wrapper.append($icon).append($label);
    $input.before($wrapper);
    $wrapper.append($input);

    $input.on("change", function () {
      var name =
        this.files && this.files.length
          ? this.files[0].name
          : "Nie wybrano pliku";
      $label.text(name);
      $wrapper.toggleClass("has-file", !!(this.files && this.files.length));
    });

    $wrapper.on("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        $input.trigger("click");
      }
    });
  });
}


$(document).ready(function () {
  $("iframe").removeAttr("frameborder");
  $("iframe").removeAttr("scrolling");

  if ($(".production-tabs").length > 0) {
    var tabLinks = document.querySelectorAll(".tablinks");
    var tabContent = document.querySelectorAll(".tabcontent");
    $(this).find(".tablinks:first").addClass("active");
    $(this).find(".tabcontent:first").addClass("active");
    tabLinks.forEach(function (el) {
      el.addEventListener("click", openTabs);
    });
    function openTabs(el) {
      var btnTarget = el.currentTarget;
      var element = btnTarget.dataset.element;
      tabContent.forEach(function (el) {
        el.classList.remove("active");
      });
      tabLinks.forEach(function (el) {
        el.classList.remove("active");
      });
      document.querySelector("#" + element).classList.add("active");
      btnTarget.classList.add("active");
    }
  }
  if ($(".lease-tabs").length > 0) {
    var tabLinksLease = document.querySelectorAll(".lease-tablinks");
    var tabContentLease = document.querySelectorAll(".lease-tabcontent");
    $(this).find(".lease-tablinks:first").addClass("active");
    $(this).find(".lease-tabcontent:first").addClass("active");
    tabLinksLease.forEach(function (el) {
      el.addEventListener("click", openTabsLease);
    });
    function openTabsLease(el) {
      var btnTargetLease = el.currentTarget;
      var elementLease = btnTargetLease.dataset.element;
      tabContentLease.forEach(function (el) {
        el.classList.remove("active");
      });
      tabLinksLease.forEach(function (el) {
        el.classList.remove("active");
      });
      document.querySelector("#" + elementLease).classList.add("active");
      btnTargetLease.classList.add("active");
    }
  }

  if ($(".accordion-list").length > 0) {
    $(".home .accordion:first").addClass("active");
    $(".home .accordion:first .accordion-content").css("display", "block");
    $(".accordion-title").click(function () {
      if ($(this).closest(".accordion").hasClass("active")) {
        $(this).closest(".accordion").removeClass("active");
        $(this).closest(".accordion").find(".accordion-content").slideUp();
      } else {
        $(".accordion").removeClass("active");
        $(".accordion").find(".accordion-content").slideUp();
        $(this).closest(".accordion").addClass("active");
        $(this).closest(".accordion").find(".accordion-content").slideDown();
      }
    });
  }

  $(".wpcf7 form.wpcf7-form .form-fields select").rebuildSelect();

  if ($(".about-gallery").length > 0) {
    var aboutGallery = new Swiper(".about-gallery", {
      autoplay: {
        delay: 3000,
      },
      loop: true,
      speed: 2000,
      onTransitionEnd: function (swiper) {
        aboutGallery.params.speed = 2000;
      },
      onTouchStart: function (swiper) {
        aboutGallery.params.speed = 400;
      },
      onTransitionStart: function (swiper) {
        aboutGallery.params.speed = 400;
      },
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: {
        el: ".about-gallery-pagi",
        clickable: true,
      },
    });
  }

  if ($(".home-news-block").length > 0) {
    // badge na pierwszym poście z listy desktopowej (ID tylko tam)
    $("#newest-post").appendTo("#post-loop1 .post-img");

    // osobny slider Swipera tylko dla listy mobilnej
    if (currentScreenSize.width() <= 1200) {
      if ($(".products-combined-slider").length > 0) {
        new Swiper(".products-combined-slider", {
          slidesPerView: 1.15,
          spaceBetween: 16,
          breakpoints: {
            480: {
              slidesPerView: 1.5,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2.2,
              spaceBetween: 20,
            },
          },
        });
      }

      if (
        $(".telka-images-list-slider").length > 0 &&
        currentScreenSize.width() < 992
      ) {
        new Swiper(".telka-images-list-slider", {
          slidesPerView: 1.15,
          spaceBetween: 16,
          breakpoints: {
            480: {
              slidesPerView: 1.5,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2.2,
              spaceBetween: 20,
            },
          },
        });
      }

      new Swiper(".posts-list-slider", {
        slidesPerView: 1.15,
        spaceBetween: 16,
        breakpoints: {
          480: {
            slidesPerView: 1.5,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 2.2,
            spaceBetween: 20,
          },
        },
      });
    }
  }

  if ($(".reviews-slider").length > 0) {
    var reviewsSlider = new Swiper(".reviews-slider", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 0,
      navigation: {
        prevEl: ".reviews-slider-btn-prev",
        nextEl: ".reviews-slider-btn-next",
      },
    });
  }

  if ($(".single-video-block").length > 0) {
    var singleVideo = $("#single-video");
    //$('<button class="play-button" id="play-button" title="Play"></button>').insertAfter('#single-video');
    var singlePlayButton = $("#play-button");
    $(singleVideo).click(function () {
      if (singleVideo[0].paused || singleVideo[0].ended) {
        singleVideo[0].play();
        $(singlePlayButton).css("opacity", "0");
      } else {
        singleVideo[0].pause();
        $(singlePlayButton).css("opacity", "1");
      }
    });
    $(singlePlayButton).click(function () {
      if (singleVideo[0].paused || singleVideo[0].ended) {
        singleVideo[0].play();
        $(singlePlayButton).css("opacity", "0");
      } else {
        singleVideo[0].pause();
        $(singlePlayButton).css("opacity", "1");
      }
    });
  }
  if ($(".page-cat-products").length > 0) {
    var reviewsSlider = new Swiper(".catprod-carousel", {
      speed: 1000,
      slidesPerView: 6.5,
      spaceBetween: 16,
      navigation: {
        prevEl: ".catprod-carousel-btn-prev",
        nextEl: ".catprod-carousel-btn-next",
      },
      breakpoints: {
        300: {
          slidesPerView: 2.5,
          spaceBetween: 16,
        },
        640: {
          slidesPerView: 2.5,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 3.5,
          spaceBetween: 16,
        },
        1024: {
          slidesPerView: 4.5,
          spaceBetween: 16,
        },
        1366: {
          slidesPerView: 5.5,
          spaceBetween: 16,
        },
      },
    });
  }

  if ($(".blog .posts-list").length > 0) {
    $("#newest-post").appendTo("#post-loop1 .post-cont");
  }

  if ($(".company-realizations-block").length > 0) {
    var realizationsCarousel = new Swiper(".realizations-block", {
      slidesPerView: 2.2,
      spaceBetween: 16,
      navigation: {
        prevEl: ".realizations-carousel-btn-prev",
        nextEl: ".realizations-carousel-btn-next",
      },
      breakpoints: {
        300: {
          slidesPerView: 1.1,
          spaceBetween: 8,
        },
        640: {
          slidesPerView: 1.1,
          spaceBetween: 8,
        },
        768: {
          slidesPerView: 2.2,
          spaceBetween: 16,
        },
        1024: {
          slidesPerView: 2.2,
          spaceBetween: 16,
        },
        1366: {
          slidesPerView: 2.2,
          spaceBetween: 16,
        },
      },
    });
  }

  if ($(".career-offers-info").length > 0) {
    var $coiInfo = $(".career-offers-info");
    var $coiBtn = $coiInfo.find(".coi-toggle");

    $coiBtn.on("click", function () {
      var expanded = $coiBtn.attr("aria-expanded") === "true";
      $coiBtn.attr("aria-expanded", expanded ? "false" : "true");
      $coiInfo.toggleClass("revealed", !expanded);
    });
  }

  if ($(".employees-block").length > 0) {
    var employeesSliderTop = new Swiper(".slider-top", {
      autoplay: {
        delay: 3000,
      },
      effect: "fade",
      speed: 1500,
      loop: true,
      slidesPerView: 1,
      spaceBetween: 0,
    });
    var employeesSliderBot = new Swiper(".slider-bottom", {
      autoplay: {
        delay: 4000,
      },
      effect: "fade",
      speed: 1500,
      loop: true,
      slidesPerView: 1,
      spaceBetween: 0,
    });
    var employeesSlideRig = new Swiper(".slider-right", {
      autoplay: {
        delay: 3500,
      },
      effect: "fade",
      speed: 1500,
      loop: true,
      slidesPerView: 1,
      spaceBetween: 0,
    });
  }

  if (currentScreenSize.width() > 768) {
    if ($(".career-mobile-block").length > 0) {
      $(".career-mobile-block").remove();
    }
  }

  // rwd less than 767px
  if (currentScreenSize.width() < 1600) {
    if ($(".employees-block").length > 0) {
      $(".eb-cols").addClass("eb-fir-row");
      $('<div class="eb-cols eb-sec-row">').insertAfter(
        $(".employees-block .eb-cols"),
      );
      $(".ebc-text").appendTo($(".eb-sec-row"));
    }
  }

  if (currentScreenSize.width() < 767) {
    $("#wrapper").addClass("rwd");

    if ($(".contact-page .map-pins-block").length > 0) {
      $(".contact-page .map-pins-block").remove();
    }
    if ($(".footer-block .social-links").length > 0) {
      $(".footer-block .social-links").insertAfter(".footer-bottom-right");
    }
  }

  $(".banner-play-button").delay(800).animate({ opacity: 1 }, 500);
  $(".banner-right-img").delay(800).animate({ opacity: 1 }, 500);

  // global scroll logic for header (desktop + mobile)
  var isHeaderStuck = false;
  $(window).on("scroll", function () {
    var scrollState = $(this).scrollTop();
    var shouldBeStuck = scrollState > 0;

    // Avoid unnecessary DOM writes on every scroll tick.
    if (shouldBeStuck !== isHeaderStuck) {
      isHeaderStuck = shouldBeStuck;
      $(".main-header").toggleClass("stuck", shouldBeStuck);
    }
  });

  if ($(".products-block-f").length > 0) {
    if (currentScreenSize.width() < 1360) {
      $('[id^="products-block-f-"]').each(function () {
        var $this = $(this);
        var blockId = $this.attr("id");
        var scrollClass = blockId + "-active-scroll";
        var scrollItemClass = blockId + "-active-scroll-item";
        $this.find(".product-blocks-list-f").addClass(scrollClass);
        $this
          .find(".product-blocks-list-f > .pblf-single")
          .addClass(scrollItemClass);
        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;
        const scrollbar = document.querySelector("." + scrollClass);
        if (!scrollbar) return;

        scrollbar.addEventListener("mousedown", (e) => {
          isDown = true;
          scrollbar.classList.add("active");
          startX = e.pageX - scrollbar.offsetLeft;
          scrollLeft = scrollbar.scrollLeft;
        });

        scrollbar.addEventListener("mouseleave", () => {
          isDown = false;
          scrollbar.classList.remove("active");
        });

        scrollbar.addEventListener("mouseup", () => {
          isDown = false;
          scrollbar.classList.remove("active");
        });

        scrollbar.addEventListener("mousemove", (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - scrollbar.offsetLeft;
          const walk = (x - startX) * 2;
          scrollbar.scrollLeft = scrollLeft - walk;
        });
      });
    }
  }
  // CF7 file input – show selected filename inside custom wrapper
  var $cfFileWrap = $('span.wpcf7-form-control-wrap[data-name="cf-file"]');
  if ($cfFileWrap.length) {
    $cfFileWrap.find('input[type="file"]').on("change", function () {
      var filename =
        this.files && this.files.length > 0
          ? this.files[0].name
          : "Załącz plik";
      $cfFileWrap.attr("data-filename", filename);
      if (this.files && this.files.length > 0) {
        $cfFileWrap.addClass("has-file");
      } else {
        $cfFileWrap.removeClass("has-file");
      }
    });
  }

  // Custom file input – works in every browser including Safari.
  // The native <input type="file"> is stretched transparent over a styled
  // wrapper so the browser's own file-picker opens on any click/tap,
  // while we fully control the visual presentation.
  initCustomFileInputs();
  $(document).on(
    "wpcf7mailsent wpcf7invalid wpcf7spam wpcf7mailfailed",
    function () {
      initCustomFileInputs();
    },
  );


}); // end document ready










