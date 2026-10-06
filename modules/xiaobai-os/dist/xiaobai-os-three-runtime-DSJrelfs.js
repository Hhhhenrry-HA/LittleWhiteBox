/* eslint-disable */
import { a as Tt, c as wt, d as xt, f as Je, h as Et, i as Se, l as Ie, m as St, n as Mt, o as Me, p as Rt, r as vt, s as At, u as se } from "./xiaobai-os-MapBrowser-BO7wwQ5c.js";
import { $ as Lt, A as Pt, At as $, B as et, C as Ot, D as ae, Dt as tt, E as Nt, Et as kt, F as Dt, Ft as A, G as ie, H as Q, I as Ct, It as Fe, J as K, K as ye, L as It, M as st, Mt as Ft, N as Ut, O as jt, Ot as Re, P as nt, Pt as k, Q as Pe, R as Ht, S as le, St as Gt, T as Bt, Tt as zt, U as Kt, V as Vt, W as he, X as ce, Y as ue, Z as Y, _ as Xt, _t as it, a as Yt, at as ot, b as Wt, bt as Zt, ct as at, d as Ue, dt as qt, et as $t, f as Qt, ft as fe, g as ve, h as Jt, ht as es, i as te, it as rt, j as ts, jt as je, k as ss, kt as ns, l as is, lt as os, m as as, mt as rs, n as cs, nt as ls, o as _e, ot as hs, p as ds, pt as He, q as pe, r as us, rt as Ge, s as Oe, st as fs, t as ps, tt as ms, u as W, ut as gs, v as bs, wt as ys, y as ct, yt as ne, z as lt } from "./xiaobai-os-three.module-CTsY3HDb.js";
import { t as Be } from "./xiaobai-os-RoundedBoxGeometry-BZgOkuSP.js";
import { n as ze } from "./xiaobai-os-BufferGeometryUtils-DP7IVjMs.js";
var Ke = { type: "change" }, Ne = { type: "start" }, ht = { type: "end" }, de = new es(), Ve = new fs(), _s = Math.cos(70 * pe.DEG2RAD), C = new A(), j = 2 * Math.PI, P = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, Te = 1e-6, Ts = class extends ds {
  constructor(e, t = null) {
    super(e, t), this.state = P.NONE, this.target = new A(), this.cursor = new A(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = {
      LEFT: "ArrowLeft",
      UP: "ArrowUp",
      RIGHT: "ArrowRight",
      BOTTOM: "ArrowDown"
    }, this.mouseButtons = {
      LEFT: ie.ROTATE,
      MIDDLE: ie.DOLLY,
      RIGHT: ie.PAN
    }, this.touches = {
      ONE: $.ROTATE,
      TWO: $.DOLLY_PAN
    }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new A(), this._lastQuaternion = new fe(), this._lastTargetPosition = new A(), this._quat = new fe().setFromUnitVectors(e.up, new A(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new Re(), this._sphericalDelta = new Re(), this._scale = 1, this._panOffset = new A(), this._rotateStart = new k(), this._rotateEnd = new k(), this._rotateDelta = new k(), this._panStart = new k(), this._panEnd = new k(), this._panDelta = new k(), this._dollyStart = new k(), this._dollyEnd = new k(), this._dollyDelta = new k(), this._dollyDirection = new A(), this._mouse = new k(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = xs.bind(this), this._onPointerDown = ws.bind(this), this._onPointerUp = Es.bind(this), this._onContextMenu = Ps.bind(this), this._onMouseWheel = Rs.bind(this), this._onKeyDown = vs.bind(this), this._onTouchStart = As.bind(this), this._onTouchMove = Ls.bind(this), this._onMouseDown = Ss.bind(this), this._onMouseMove = Ms.bind(this), this._interceptControlDown = Os.bind(this), this._interceptControlUp = Ns.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
  }
  connect(e) {
    super.connect(e), this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointercancel", this._onPointerUp), this.domElement.addEventListener("contextmenu", this._onContextMenu), this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: !1 }), this.domElement.getRootNode().addEventListener("keydown", this._interceptControlDown, {
      passive: !0,
      capture: !0
    }), this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.domElement.removeEventListener("pointercancel", this._onPointerUp), this.domElement.removeEventListener("wheel", this._onMouseWheel), this.domElement.removeEventListener("contextmenu", this._onContextMenu), this.stopListenToKeyEvents(), this.domElement.getRootNode().removeEventListener("keydown", this._interceptControlDown, { capture: !0 }), this.domElement.style.touchAction = "auto";
  }
  dispose() {
    this.disconnect();
  }
  getPolarAngle() {
    return this._spherical.phi;
  }
  getAzimuthalAngle() {
    return this._spherical.theta;
  }
  getDistance() {
    return this.object.position.distanceTo(this.target);
  }
  listenToKeyEvents(e) {
    e.addEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = e;
  }
  stopListenToKeyEvents() {
    this._domElementKeyEvents !== null && (this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = null);
  }
  saveState() {
    this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
  }
  reset() {
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(Ke), this.update(), this.state = P.NONE;
  }
  update(e = null) {
    const t = this.object.position;
    C.copy(t).sub(this.target), C.applyQuaternion(this._quat), this._spherical.setFromVector3(C), this.autoRotate && this.state === P.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let o = this.minAzimuthAngle, s = this.maxAzimuthAngle;
    isFinite(o) && isFinite(s) && (o < -Math.PI ? o += j : o > Math.PI && (o -= j), s < -Math.PI ? s += j : s > Math.PI && (s -= j), o <= s ? this._spherical.theta = Math.max(o, Math.min(s, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (o + s) / 2 ? Math.max(o, this._spherical.theta) : Math.min(s, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let n = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera) this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const i = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), n = i != this._spherical.radius;
    }
    if (C.setFromSpherical(this._spherical), C.applyQuaternion(this._quatInverse), t.copy(this.target).add(C), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let i = null;
      if (this.object.isPerspectiveCamera) {
        const a = C.length();
        i = this._clampDistance(a * this._scale);
        const r = a - i;
        this.object.position.addScaledVector(this._dollyDirection, r), this.object.updateMatrixWorld(), n = !!r;
      } else if (this.object.isOrthographicCamera) {
        const a = new A(this._mouse.x, this._mouse.y, 0);
        a.unproject(this.object);
        const r = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), n = r !== this.object.zoom;
        const l = new A(this._mouse.x, this._mouse.y, 0);
        l.unproject(this.object), this.object.position.sub(l).add(a), this.object.updateMatrixWorld(), i = C.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      i !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(i).add(this.object.position) : (de.origin.copy(this.object.position), de.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(de.direction)) < _s ? this.object.lookAt(this.target) : (Ve.setFromNormalAndCoplanarPoint(this.object.up, this.target), de.intersectPlane(Ve, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const i = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), i !== this.object.zoom && (this.object.updateProjectionMatrix(), n = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, n || this._lastPosition.distanceToSquared(this.object.position) > Te || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > Te || this._lastTargetPosition.distanceToSquared(this.target) > Te ? (this.dispatchEvent(Ke), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(e) {
    return e !== null ? j / 60 * this.autoRotateSpeed * e : j / 60 / 60 * this.autoRotateSpeed;
  }
  _getZoomScale(e) {
    const t = Math.abs(e * 0.01);
    return Math.pow(0.95, this.zoomSpeed * t);
  }
  _rotateLeft(e) {
    this._sphericalDelta.theta -= e;
  }
  _rotateUp(e) {
    this._sphericalDelta.phi -= e;
  }
  _panLeft(e, t) {
    C.setFromMatrixColumn(t, 0), C.multiplyScalar(-e), this._panOffset.add(C);
  }
  _panUp(e, t) {
    this.screenSpacePanning === !0 ? C.setFromMatrixColumn(t, 1) : (C.setFromMatrixColumn(t, 0), C.crossVectors(this.object.up, C)), C.multiplyScalar(e), this._panOffset.add(C);
  }
  _pan(e, t) {
    const o = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const s = this.object.position;
      C.copy(s).sub(this.target);
      let n = C.length();
      n *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * e * n / o.clientHeight, this.object.matrix), this._panUp(2 * t * n / o.clientHeight, this.object.matrix);
    } else this.object.isOrthographicCamera ? (this._panLeft(e * (this.object.right - this.object.left) / this.object.zoom / o.clientWidth, this.object.matrix), this._panUp(t * (this.object.top - this.object.bottom) / this.object.zoom / o.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = !1);
  }
  _dollyOut(e) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale /= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _dollyIn(e) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale *= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _updateZoomParameters(e, t) {
    if (!this.zoomToCursor) return;
    this._performCursorZoom = !0;
    const o = this.domElement.getBoundingClientRect(), s = e - o.left, n = t - o.top, i = o.width, a = o.height;
    this._mouse.x = s / i * 2 - 1, this._mouse.y = -(n / a) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
  }
  _clampDistance(e) {
    return Math.max(this.minDistance, Math.min(this.maxDistance, e));
  }
  _handleMouseDownRotate(e) {
    this._rotateStart.set(e.clientX, e.clientY);
  }
  _handleMouseDownDolly(e) {
    this._updateZoomParameters(e.clientX, e.clientX), this._dollyStart.set(e.clientX, e.clientY);
  }
  _handleMouseDownPan(e) {
    this._panStart.set(e.clientX, e.clientY);
  }
  _handleMouseMoveRotate(e) {
    this._rotateEnd.set(e.clientX, e.clientY), this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(j * this._rotateDelta.x / t.clientHeight), this._rotateUp(j * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
  }
  _handleMouseMoveDolly(e) {
    this._dollyEnd.set(e.clientX, e.clientY), this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart), this._dollyDelta.y > 0 ? this._dollyOut(this._getZoomScale(this._dollyDelta.y)) : this._dollyDelta.y < 0 && this._dollyIn(this._getZoomScale(this._dollyDelta.y)), this._dollyStart.copy(this._dollyEnd), this.update();
  }
  _handleMouseMovePan(e) {
    this._panEnd.set(e.clientX, e.clientY), this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd), this.update();
  }
  _handleMouseWheel(e) {
    this._updateZoomParameters(e.clientX, e.clientY), e.deltaY < 0 ? this._dollyIn(this._getZoomScale(e.deltaY)) : e.deltaY > 0 && this._dollyOut(this._getZoomScale(e.deltaY)), this.update();
  }
  _handleKeyDown(e) {
    let t = !1;
    switch (e.code) {
      case this.keys.UP:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(j * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), t = !0;
        break;
      case this.keys.BOTTOM:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(-j * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), t = !0;
        break;
      case this.keys.LEFT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(j * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), t = !0;
        break;
      case this.keys.RIGHT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(-j * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), t = !0;
        break;
    }
    t && (e.preventDefault(), this.update());
  }
  _handleTouchStartRotate(e) {
    if (this._pointers.length === 1) this._rotateStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), o = 0.5 * (e.pageX + t.x), s = 0.5 * (e.pageY + t.y);
      this._rotateStart.set(o, s);
    }
  }
  _handleTouchStartPan(e) {
    if (this._pointers.length === 1) this._panStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), o = 0.5 * (e.pageX + t.x), s = 0.5 * (e.pageY + t.y);
      this._panStart.set(o, s);
    }
  }
  _handleTouchStartDolly(e) {
    const t = this._getSecondPointerPosition(e), o = e.pageX - t.x, s = e.pageY - t.y, n = Math.sqrt(o * o + s * s);
    this._dollyStart.set(0, n);
  }
  _handleTouchStartDollyPan(e) {
    this.enableZoom && this._handleTouchStartDolly(e), this.enablePan && this._handleTouchStartPan(e);
  }
  _handleTouchStartDollyRotate(e) {
    this.enableZoom && this._handleTouchStartDolly(e), this.enableRotate && this._handleTouchStartRotate(e);
  }
  _handleTouchMoveRotate(e) {
    if (this._pointers.length == 1) this._rotateEnd.set(e.pageX, e.pageY);
    else {
      const o = this._getSecondPointerPosition(e), s = 0.5 * (e.pageX + o.x), n = 0.5 * (e.pageY + o.y);
      this._rotateEnd.set(s, n);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(j * this._rotateDelta.x / t.clientHeight), this._rotateUp(j * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(e) {
    if (this._pointers.length === 1) this._panEnd.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), o = 0.5 * (e.pageX + t.x), s = 0.5 * (e.pageY + t.y);
      this._panEnd.set(o, s);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(e) {
    const t = this._getSecondPointerPosition(e), o = e.pageX - t.x, s = e.pageY - t.y, n = Math.sqrt(o * o + s * s);
    this._dollyEnd.set(0, n), this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
    const i = (e.pageX + t.x) * 0.5, a = (e.pageY + t.y) * 0.5;
    this._updateZoomParameters(i, a);
  }
  _handleTouchMoveDollyPan(e) {
    this.enableZoom && this._handleTouchMoveDolly(e), this.enablePan && this._handleTouchMovePan(e);
  }
  _handleTouchMoveDollyRotate(e) {
    this.enableZoom && this._handleTouchMoveDolly(e), this.enableRotate && this._handleTouchMoveRotate(e);
  }
  _addPointer(e) {
    this._pointers.push(e.pointerId);
  }
  _removePointer(e) {
    delete this._pointerPositions[e.pointerId];
    for (let t = 0; t < this._pointers.length; t++) if (this._pointers[t] == e.pointerId) {
      this._pointers.splice(t, 1);
      return;
    }
  }
  _isTrackingPointer(e) {
    for (let t = 0; t < this._pointers.length; t++) if (this._pointers[t] == e.pointerId) return !0;
    return !1;
  }
  _trackPointer(e) {
    let t = this._pointerPositions[e.pointerId];
    t === void 0 && (t = new k(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
  }
  _getSecondPointerPosition(e) {
    const t = e.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[t];
  }
  _customWheelEvent(e) {
    const t = e.deltaMode, o = {
      clientX: e.clientX,
      clientY: e.clientY,
      deltaY: e.deltaY
    };
    switch (t) {
      case 1:
        o.deltaY *= 16;
        break;
      case 2:
        o.deltaY *= 100;
        break;
    }
    return e.ctrlKey && !this._controlActive && (o.deltaY *= 10), o;
  }
};
function ws(e) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(e.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(e) && (this._addPointer(e), e.pointerType === "touch" ? this._onTouchStart(e) : this._onMouseDown(e)));
}
function xs(e) {
  this.enabled !== !1 && (e.pointerType === "touch" ? this._onTouchMove(e) : this._onMouseMove(e));
}
function Es(e) {
  switch (this._removePointer(e), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(e.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(ht), this.state = P.NONE;
      break;
    case 1:
      const t = this._pointers[0], o = this._pointerPositions[t];
      this._onTouchStart({
        pointerId: t,
        pageX: o.x,
        pageY: o.y
      });
      break;
  }
}
function Ss(e) {
  let t;
  switch (e.button) {
    case 0:
      t = this.mouseButtons.LEFT;
      break;
    case 1:
      t = this.mouseButtons.MIDDLE;
      break;
    case 2:
      t = this.mouseButtons.RIGHT;
      break;
    default:
      t = -1;
  }
  switch (t) {
    case ie.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseDownDolly(e), this.state = P.DOLLY;
      break;
    case ie.ROTATE:
      if (e.ctrlKey || e.metaKey || e.shiftKey) {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(e), this.state = P.PAN;
      } else {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(e), this.state = P.ROTATE;
      }
      break;
    case ie.PAN:
      if (e.ctrlKey || e.metaKey || e.shiftKey) {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(e), this.state = P.ROTATE;
      } else {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(e), this.state = P.PAN;
      }
      break;
    default:
      this.state = P.NONE;
  }
  this.state !== P.NONE && this.dispatchEvent(Ne);
}
function Ms(e) {
  switch (this.state) {
    case P.ROTATE:
      if (this.enableRotate === !1) return;
      this._handleMouseMoveRotate(e);
      break;
    case P.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseMoveDolly(e);
      break;
    case P.PAN:
      if (this.enablePan === !1) return;
      this._handleMouseMovePan(e);
      break;
  }
}
function Rs(e) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== P.NONE || (e.preventDefault(), this.dispatchEvent(Ne), this._handleMouseWheel(this._customWheelEvent(e)), this.dispatchEvent(ht));
}
function vs(e) {
  this.enabled !== !1 && this._handleKeyDown(e);
}
function As(e) {
  switch (this._trackPointer(e), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case $.ROTATE:
          if (this.enableRotate === !1) return;
          this._handleTouchStartRotate(e), this.state = P.TOUCH_ROTATE;
          break;
        case $.PAN:
          if (this.enablePan === !1) return;
          this._handleTouchStartPan(e), this.state = P.TOUCH_PAN;
          break;
        default:
          this.state = P.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case $.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          this._handleTouchStartDollyPan(e), this.state = P.TOUCH_DOLLY_PAN;
          break;
        case $.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1) return;
          this._handleTouchStartDollyRotate(e), this.state = P.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = P.NONE;
      }
      break;
    default:
      this.state = P.NONE;
  }
  this.state !== P.NONE && this.dispatchEvent(Ne);
}
function Ls(e) {
  switch (this._trackPointer(e), this.state) {
    case P.TOUCH_ROTATE:
      if (this.enableRotate === !1) return;
      this._handleTouchMoveRotate(e), this.update();
      break;
    case P.TOUCH_PAN:
      if (this.enablePan === !1) return;
      this._handleTouchMovePan(e), this.update();
      break;
    case P.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1) return;
      this._handleTouchMoveDollyPan(e), this.update();
      break;
    case P.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1) return;
      this._handleTouchMoveDollyRotate(e), this.update();
      break;
    default:
      this.state = P.NONE;
  }
}
function Ps(e) {
  this.enabled !== !1 && e.preventDefault();
}
function Os(e) {
  e.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, {
    passive: !0,
    capture: !0
  }));
}
function Ns(e) {
  e.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, {
    passive: !0,
    capture: !0
  }));
}
var Xe = {
  table: ["rect", "circle"],
  counter: ["rect"],
  chair: ["rect"],
  bed: ["rect"],
  shelf: ["rect"],
  sofa: ["rect"],
  bridge: ["rect"],
  tree: ["rect", "circle"],
  rock: ["rect", "circle"],
  column: ["rect", "circle"],
  partition: ["rect"],
  ladder: ["rect"],
  well: ["rect", "circle"],
  fountain: ["rect", "circle"],
  fire: ["rect", "circle"],
  flag: ["rect"],
  sign: ["rect"],
  terminal: ["rect"],
  machine: ["rect"],
  "vending-machine": ["rect"]
};
function ks(e) {
  if (se(e) || ["wall", "grid"].includes(e.category) || !e.icon || !Object.hasOwn(Xe, e.icon)) return;
  const t = e.icon;
  return Xe[t].includes(e.shape) ? t : void 0;
}
function Ds(e) {
  const [t, o, s, n] = e.viewBox, i = Math.max(s, n) / 14;
  return {
    scale: i,
    point: (a, r, l = 0) => new A((a - t - s / 2) / i, l, (r - o - n / 2) / i)
  };
}
function Cs(e, t) {
  const o = Je(e), s = [o.x + o.width / 2, o.y + o.height / 2], n = St(e), i = n.points.map(([a, r]) => new k((a - s[0]) / t, (r - s[1]) / t));
  return n.closed && i.length > 1 && i[0].equals(i[i.length - 1]) && i.pop(), {
    center: s,
    width: o.width / t,
    depth: o.height / t,
    points: i,
    closed: n.closed,
    rotation: -(e.rotation || 0) * Math.PI / 180
  };
}
function Is(e, t) {
  const o = new bs(new Gt(e.map((s) => new k(s.x, -s.y))), {
    depth: t,
    bevelEnabled: !1,
    steps: 1,
    curveSegments: 1
  });
  return o.rotateX(-Math.PI / 2), o;
}
function Fs(e, t, o) {
  const s = e.map((n) => new A(n.x, o, n.y));
  return t && s.length && s.push(s[0].clone()), new Oe().setFromPoints(s);
}
function Us(e, t, o) {
  const s = [];
  for (let i = 0; i < e.length - (t ? 0 : 1); i += 1) {
    const a = e[i], r = e[(i + 1) % e.length], l = r.clone().sub(a);
    if (!l.lengthSq()) continue;
    const h = new k(-l.y, l.x).normalize().multiplyScalar(o / 2), c = [
      a.clone().add(h),
      a.clone().sub(h),
      r.clone().add(h),
      r.clone().sub(h)
    ];
    for (const d of [
      0,
      2,
      1,
      1,
      2,
      3
    ]) s.push(c[d].x, 0, c[d].y);
  }
  const n = new Oe();
  return n.setAttribute("position", new Wt(s, 3)), n.computeVertexNormals(), n;
}
function dt(e, t) {
  return e.slice(0, t ? e.length : -1).flatMap((o, s) => {
    const n = e[(s + 1) % e.length], i = o.distanceTo(n);
    return i ? [{
      x: (o.x + n.x) / 2,
      z: (o.y + n.y) / 2,
      length: i,
      rotation: -Math.atan2(n.y - o.y, n.x - o.x)
    }] : [];
  });
}
function js(e, t) {
  const s = new Uint8Array(65536);
  let n = 781;
  for (let a = 0; a < 128; a += 1) for (let r = 0; r < 128; r += 1) {
    n = Math.imul(n, 1664525) + 1013904223 >>> 0;
    const l = n / 4294967296;
    let h = 0.94 + l * 0.06;
    if (e === "wood") {
      if (h = 0.89 + Math.sin(a * 0.82 + Math.sin(r * Math.PI / 64) * 2 + Math.sin(a * 0.19)) * 0.045 + l * 0.04, t) {
        const d = Math.floor(a / 32);
        h += [
          0,
          0.025,
          -0.02,
          0.012
        ][d], (a % 32 === 0 || (r + d * 47) % 128 === 0) && (h = 0.69);
      }
    } else e === "tile" ? h = r % 64 < 2 || a % 64 < 2 ? 0.73 : 0.96 + l * 0.04 : [
      "fabric",
      "carpet",
      "bed-sheet",
      "tatami"
    ].includes(e) ? h = 0.88 + (r % 4 < 2 == a % 4 < 2 ? 0.07 : 0) + l * 0.05 : (e === "stone" || e === "marble") && (h = 0.92 + Math.sin(r * 0.15 + Math.sin(a * 0.12)) * 0.025 + l * 0.055);
    const c = Math.round(h * 255);
    s.set([
      c,
      c,
      c,
      255
    ], (a * 128 + r) * 4);
  }
  const i = new Jt(s, 128, 128, rs);
  return i.colorSpace = ne, i.wrapS = i.wrapT = it, t && e === "wood" && i.repeat.set(0.55, 0.55), i.magFilter = lt, i.minFilter = et, i.generateMipmaps = !0, i.anisotropy = 4, i.needsUpdate = !0, i;
}
var Hs = {
  ...Et,
  wood: "#9c6847",
  stone: "#c5cbd0",
  tile: "#cbd6df",
  carpet: "#a67568",
  fabric: "#608e92",
  "bed-sheet": "#e3e7e9",
  metal: "#98acbf",
  glass: "#b3deeb",
  marble: "#e5e6e7",
  water: "#6aabbf",
  grass: "#b7cba0",
  forest: "#6d957d"
};
function Gs(e, t, o) {
  const s = Se(o), n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  function r(c, d = 0) {
    const u = c.material || (c.category === "water" ? "water" : "unknown"), p = `${u}:${c.category}:${c.certainty}:${d}`;
    let b = n.get(p);
    if (!b) {
      const y = {
        danger: "#d77c80",
        magic: "#b29cdb",
        light: "#f4d697",
        actor: "#4598cf",
        marker: "#72b9cb",
        secret: "#8d9ca9"
      }, g = c.category === "terrain", m = u === "wood" && g ? "#c8ab85" : Hs[u], _ = new W(!c.material && c.category in y ? y[c.category] : m);
      _.lerp(new W(d > 0 ? "#ffffff" : "#201c1a"), Math.abs(d));
      const f = Me(c, "").opacity * (u === "glass" ? 0.42 : 1), w = [
        "wood",
        "tile",
        "tatami",
        "fabric",
        "carpet",
        "bed-sheet",
        "stone",
        "sand",
        "dirt",
        "marble"
      ].includes(u), S = `${u}:${g}`;
      w && !a.has(S) && a.set(S, e.own(js(u, g)));
      const L = a.get(S) || null;
      b = e.own(new Pe({
        color: _,
        roughness: u === "metal" ? 0.32 : u === "glass" || u === "water" ? 0.22 : u === "wood" ? 0.64 : 0.92,
        metalness: u === "metal" ? 0.32 : 0,
        transparent: f < 1,
        opacity: f,
        depthWrite: f >= 1,
        side: 2,
        map: L,
        bumpMap: L,
        bumpScale: u === "wood" ? 0.018 : 9e-3,
        emissive: [
          "rune",
          "warm-light",
          "cold-light"
        ].includes(u) ? _ : "#000000",
        emissiveIntensity: u === "warm-light" || u === "cold-light" ? s.lampEmission : 0.18
      })), n.set(p, b);
    }
    return b;
  }
  function l(c) {
    const d = `${c.certainty}:${c.category}`;
    let u = i.get(d);
    if (!u) {
      const p = c.certainty && c.certainty !== "confirmed";
      u = e.own(new Ct({
        color: t ? "#b1bfca" : "#798b91",
        dashSize: c.certainty === "unknown" ? 0.035 : 0.12,
        gapSize: p ? 0.09 : 0,
        transparent: !0,
        opacity: Me(c, "").opacity
      })), i.set(d, u);
    }
    return u;
  }
  function h(c, d = 0) {
    const u = o?.artificial === "on" ? c.material === "cold-light" ? "cold-light" : "warm-light" : "bed-sheet";
    return r({
      ...c,
      material: u
    }, d);
  }
  return {
    mesh: r,
    line: l,
    lampShade: h
  };
}
var ut = class {
  resources = /* @__PURE__ */ new Set();
  own(e) {
    return this.resources.add(e), e;
  }
  dispose() {
    for (const e of this.resources) e.dispose();
    this.resources.clear();
  }
};
function Bs(e, t, o, s) {
  const { cylinder: n, ring: i, cone: a } = s;
  switch (e) {
    case "column": {
      const r = t.shape === "circle" ? n : void 0;
      return o(0, 0.08, 0, 1, 0.16, 1, -0.12, r), o(0, 0.91, 0, 0.68, 1.5, 0.68, 0.02, r), o(0, 1.7, 0, 0.9, 0.12, 0.9, 0.12, r), 1.76;
    }
    case "partition":
      for (const r of [-0.4, 0.4])
        o(r, 0.055, 0, 0.15, 0.11, 1, -0.18), o(r, 0.79, 0, 0.07, 1.5, 0.15, -0.15);
      return o(0, 0.83, 0, 0.78, 1.27, 0.09, 0.08), o(0, 1.5, 0, 0.88, 0.06, 0.15, 0.14), 1.54;
    case "ladder":
      for (const r of [-0.36, 0.36]) o(r, 0.9, 0, 0.09, 1.8, 0.2, -0.1);
      for (let r = 0; r < 6; r++) o(0, 0.18 + r * 0.29, 0, 0.7, 0.055, 0.16, 0.13);
      return 1.8;
    case "well":
      return o(0, 0.21, 0, 0.94, 0.42, 0.94, -0.08, i, t.material || "stone"), o(0, 0.44, 0, 1, 0.08, 1, 0.12, i, t.material || "stone"), 0.48;
    case "fountain":
      return o(0, 0.03, 0, 0.92, 0.06, 0.92, -0.2, n, t.material || "stone"), o(0, 0.13, 0, 1, 0.2, 1, 0.1, i, t.material || "stone"), o(0, 0.38, 0, 0.18, 0.7, 0.18, -0.06, n, t.material || "stone"), o(0, 0.72, 0, 0.48, 0.1, 0.48, 0.12, i, t.material || "stone"), o(0, 0.85, 0, 0.08, 0.17, 0.08, -0.12, n, t.material || "stone"), 0.935;
    case "fire":
      return o(0, 0.055, 0, 0.85, 0.11, 0.17, -0.28, void 0, "wood"), o(0, 0.11, 0, 0.17, 0.11, 0.85, -0.15, void 0, "wood"), o(0, 0.43, 0, 0.6, 0.62, 0.6, 0, a, "warm-light"), o(0.1, 0.31, 0.12, 0.32, 0.4, 0.32, 0.35, a, "warm-light"), 0.74;
    case "flag":
      return o(-0.37, 0.035, 0, 0.25, 0.07, 0.7, -0.22), o(-0.37, 0.8, 0, 0.045, 1.6, 0.08, -0.15), o(0.04, 1.28, 0, 0.77, 0.46, 0.035, 0.1, void 0, t.material || "fabric"), 1.6;
    case "sign":
      for (const r of [-0.3, 0.3])
        o(r, 0.055, 0, 0.18, 0.11, 0.85, -0.22), o(r, 0.62, 0, 0.07, 1.2, 0.16, -0.12);
      return o(0, 0.9, 0, 1, 0.64, 0.18, -0.05), o(0, 0.9, 0.095, 0.9, 0.52, 0.025, 0.22), 1.22;
    case "terminal":
      return o(0, 0.065, 0, 0.72, 0.13, 0.84, -0.25), o(0, 0.54, -0.09, 0.4, 1, 0.44, -0.1), o(0, 1.1, -0.12, 1, 0.7, 0.3, -0.16), o(0, 1.11, 0.04, 0.86, 0.54, 0.025, -0.6), o(0, 0.77, 0.21, 0.88, 0.06, 0.55, 0.12), 1.45;
    case "machine":
      o(0, 0.055, 0, 1, 0.11, 1, -0.25), o(-0.16, 0.39, 0, 0.62, 0.64, 0.82, 0), o(-0.16, 0.79, 0, 0.54, 0.22, 0.72, 0.15), o(0.34, 0.46, 0, 0.26, 0.76, 0.73, -0.14);
      for (const r of [
        -0.34,
        -0.2,
        -0.06,
        0.08
      ]) o(r, 0.5, 0.421, 0.04, 0.3, 0.014, -0.5);
      return 0.9;
    case "vending-machine":
      return o(0, 0.1, 0, 0.94, 0.2, 0.86, -0.25), o(0, 0.92, 0, 1, 1.68, 0.92, -0.02), o(-0.12, 1.11, 0.468, 0.64, 1.05, 0.018, -0.5), o(0.34, 1.05, 0.48, 0.17, 0.38, 0.03, -0.18), o(0, 0.31, 0.468, 0.74, 0.18, 0.018, -0.65), o(0, 1.73, 0, 1, 0.07, 0.98, 0.16), 1.765;
  }
}
function zs(e, t) {
  const o = e.own(new Be(1, 1, 1, 3, 0.035)), s = e.own(new Be(1, 1, 1, 4, 0.16)), n = e.own(o.clone()), i = n.getAttribute("position");
  for (let d = 0; d < i.count; d += 1) {
    const u = 0.72 + 0.28 * (i.getY(d) + 0.5);
    i.setX(d, i.getX(d) * u), i.setZ(d, i.getZ(d) * u);
  }
  n.computeVertexNormals();
  const a = e.own(new as(0.5, 0.5, 1, 32)), r = e.own(new tt(0.5, 16, 10)), l = e.own(new Xt(0.5, 0)), h = e.own(new Qt(0.5, 1, 9)), c = e.own(new Ut([
    [0.35, -0.5],
    [0.5, -0.5],
    [0.5, 0.5],
    [0.35, 0.5],
    [0.35, -0.5]
  ].map(([d, u]) => new k(d, u)), 32));
  return function(u, p, b, y, g) {
    const m = Math.min(1.6, Math.min(y, g)), _ = /* @__PURE__ */ new Map();
    function f(T, O, E, I, M, N, D = 0, F = o, V) {
      const Z = t.mesh(V ? {
        ...p,
        material: V
      } : p, D), U = `${F.uuid}:${Z.uuid}`;
      _.has(U) || _.set(U, {
        geometry: F,
        material: Z,
        matrices: []
      }), _.get(U).matrices.push(new K().makeScale(I * y, M * m, N * g).setPosition(T * y, O * m, E * g));
    }
    function w(T) {
      for (const O of [-0.37, 0.37]) for (const E of [-0.36, 0.36]) f(O, T / 2, E, 0.075, T, 0.075, -0.16, n);
    }
    function S() {
      switch (b) {
        case "table":
          if (p.shape === "circle")
            f(0, 0.6, 0, 1, 0.08, 1, 0.12, a), f(0, 0.29, 0, 0.18, 0.58, 0.18, -0.15, a), f(0, 0.04, 0, 0.43, 0.08, 0.43, -0.22, a);
          else {
            w(0.58);
            for (const T of [-0.36, 0.36]) f(0, 0.52, T, 0.83, 0.13, 0.045, -0.12);
            for (const T of [-0.37, 0.37]) f(T, 0.52, 0, 0.045, 0.13, 0.75, -0.12);
            f(0, 0.607, 0, 0.98, 0.065, 0.98, -0.1), f(0, 0.651, 0, 1, 0.035, 1, 0.12);
          }
          return 0.67 * m;
        case "chair":
          w(0.52), f(0, 0.55, 0.035, 1, 0.08, 0.93, 0.06), f(0, 0.595, 0.05, 0.91, 0.035, 0.83, 0.16);
          for (const T of [-0.42, 0.42]) f(T, 0.82, -0.425, 0.095, 0.73, 0.12, -0.1);
          for (const T of [
            -0.22,
            0,
            0.22
          ]) f(T, 0.9, -0.425, 0.12, 0.42, 0.07, 0.02);
          f(0, 1.14, -0.425, 0.96, 0.1, 0.14, 0.12);
          for (const T of [-0.37, 0.37]) f(T, 0.23, 0, 0.035, 0.045, 0.74, -0.12);
          return 1.19 * m;
        case "bed":
          return w(0.2), f(0, 0.24, 0, 1, 0.18, 1, -0.2), f(0, 0.39, 0.02, 0.96, 0.16, 0.92, 0.55), f(0, 0.5, 0.15, 0.98, 0.06, 0.63, 0.08), f(0, 0.5, -0.29, 0.64, 0.13, 0.22, 0.65), f(0, 0.47, -0.47, 1, 0.7, 0.06, -0.16), 0.82 * m;
        case "counter":
          f(0, 0.08, 0, 0.9, 0.16, 0.86, -0.28), f(0, 0.57, 0, 0.94, 0.9, 0.91, -0.08), f(0, 0.17, 0.46, 0.96, 0.1, 0.06, 0.06), f(0, 0.94, 0.46, 0.96, 0.08, 0.06, 0.08);
          for (const T of [
            -0.32,
            0,
            0.32
          ])
            f(T, 0.55, 0.46, 0.28, 0.66, 0.045, 0.03), f(T, 0.55, 0.487, 0.235, 0.52, 0.02, -0.09);
          return f(0, 1.025, 0, 1, 0.065, 1, -0.18), f(0, 1.065, 0, 1, 0.03, 1, 0.16), 1.08 * m;
        case "shelf":
          f(0, 1.05, -0.47, 1, 2.1, 0.06, -0.2);
          for (const T of [-0.48, 0.48]) f(T, 1.05, 0, 0.04, 2.1, 1, -0.08);
          for (let T = 0; T < 4; T += 1) f(0, 0.04 + T * 0.67, 0, 1, 0.06, 1, 0.12);
          for (const T of [-0.17, 0.17]) f(T, 1.03, 0, 0.025, 1.98, 0.92, -0.04);
          return f(0, 2.06, 0, 1, 0.08, 1, 0.16), 2.1 * m;
        case "sofa":
          w(0.14), f(0, 0.26, 0, 0.96, 0.27, 0.96, -0.18), f(0, 0.65, -0.37, 0.98, 0.76, 0.26, -0.08, s);
          for (const T of [-0.44, 0.44]) f(T, 0.52, 0, 0.12, 0.49, 0.98, 0.02, s);
          for (const T of [
            -0.26,
            0,
            0.26
          ])
            f(T, 0.46, 0.11, 0.245, 0.19, 0.72, 0.12, s), f(T, 0.77, -0.22, 0.245, 0.43, 0.22, 0.08, s);
          return 1.04 * m;
        case "bridge":
          for (let T = 0; T < 12; T += 1) f(0, 0.16, -0.46 + T * 0.083, 1, 0.1, 0.075, T % 2 ? 0.1 : 0);
          for (const T of [-0.45, 0.45]) {
            f(T, 0.61, 0, 0.045, 0.045, 1, -0.15);
            for (const O of [
              -0.45,
              0,
              0.45
            ]) f(T, 0.35, O, 0.055, 0.55, 0.04, -0.18);
          }
          return 0.65 * m;
        case "tree":
          return f(0, 0.44, 0, 0.14, 0.88, 0.14, -0.42, a), f(0, 1.04, 0, 1, 1.2, 1, -0.04, r), f(-0.16, 1.3, -0.06, 0.6, 0.65, 0.6, 0.13, r), 1.65 * m;
        case "rock":
          return f(0, 0.29, 0, 1, 0.62, 1, 0.03, l), 0.6 * m;
        default:
          return Bs(b, p, f, {
            cylinder: a,
            ring: c,
            cone: h
          }) * m;
      }
    }
    const L = S();
    for (const { geometry: T, material: O, matrices: E } of _.values()) {
      const I = e.own(new ae(T, O, E.length));
      E.forEach((M, N) => I.setMatrixAt(N, M)), I.castShadow = O.opacity >= 0.8, I.receiveShadow = !0, u.add(I);
    }
    return L;
  };
}
var Ks = /* @__PURE__ */ JSON.parse('[{"icon":"table","file":"table.glb","originalFile":"furniture/Models/GLTF format/table.glb","sourceSha256":"ff1a94498d023957f4bc3ff6f55a7a82977d336dbf01a573b3364f03afe5ff61","sha256":"07cd3bfb1f6884b7476a2e6222f735bbd0e7ff9b29c59f210d9a06fe9f1ba5e8","bytes":12476,"triangles":120,"batches":1,"geometryBytes":11520,"size":[0.8414879441261292,0.3267339766025543,0.44737333059310913],"radius":0.4765094062648687},{"icon":"chair","file":"chairRounded.glb","originalFile":"furniture/Models/GLTF format/chairRounded.glb","sourceSha256":"53f4933ec547179c499f04dbda1231cf44b83ec82c7f4ab981cdf680aee5c973","sha256":"f62c6c7e655f8360971bd859c14c150a1f77355f14b5379b29cdd6d1fb97db4c","bytes":27844,"triangles":280,"batches":1,"geometryBytes":26880,"size":[0.20000000298023224,0.45499998331069946,0.20000000298023224],"radius":0.14142135834465194},{"icon":"bed","file":"bedSingle.glb","originalFile":"furniture/Models/GLTF format/bedSingle.glb","sourceSha256":"ca00c63f9a12da3138d902b2f5f18e0360fb6e8a5ac42ccb4bc3f185724b65d1","sha256":"b89c28f9ad8e77ddbc8fd9bcfb8a8f87157a7c8971dd20ee0718b6f585629c89","bytes":22864,"triangles":214,"batches":3,"geometryBytes":20544,"size":[0.5709999799728394,0.375,1.125],"radius":0.6294541280557842},{"icon":"shelf","file":"bookcaseOpenLow.glb","originalFile":"furniture/Models/GLTF format/bookcaseOpenLow.glb","sourceSha256":"6d4d625faf977a2dbf155f1313cd32c6310e463114a1cd4c08cb9f80a5fb1d75","sha256":"c67a8d18cd802afb82d74a73d0c0dc85a7188facbfb5ede13909b9bc6cc33226","bytes":18596,"triangles":184,"batches":1,"geometryBytes":17664,"size":[0.4000000059604645,0.4000000059604645,0.25],"radius":0.23584953082864699},{"icon":"tree","file":"tree_oak.glb","originalFile":"nature/Models/GLTF format/tree_oak.glb","sourceSha256":"d7fd8773674928c50c11b66d12c636d49bdcc15a8b1c7fbb98e6f63a3439a3f3","sha256":"adb24a59f159f214971fefe7e51539d7a938a8a3908b0d756c25e914d0bce681","bytes":20500,"triangles":196,"batches":2,"geometryBytes":18816,"size":[0.6405540108680725,1.2262399204075336,0.7396479845046997],"radius":0.36982402101696993},{"icon":"rock","file":"stone_largeE.glb","originalFile":"nature/Models/GLTF format/stone_largeE.glb","sourceSha256":"392cf28f85aa4b7b7c5e12b1a3b87fe2b3a7c5ec1797d5d1d0d58edca6da9de8","sha256":"07185b2e5f8ce40fc14e8c29db249fa607da56651abcf22f93f8c02f4d7512af","bytes":7116,"triangles":64,"batches":1,"geometryBytes":6144,"size":[1.095458745956421,0.2922479815781114,0.9198710918426514],"radius":0.5865749968024526},{"icon":"stool","file":"stoolBar.glb","originalFile":"furniture/Models/GLTF format/stoolBar.glb","sourceSha256":"a86167a9f92401a61fec7e509ad089ecc552d0f299743add3aeb919acb24e341","sha256":"6fe6e654458f50ab7e73cc5977f055a50562cb74a56a8bd5ebaac312f03c4563","bytes":17852,"triangles":176,"batches":1,"geometryBytes":16896,"size":[0.2654399871826172,0.4350000023841858,0.2298777848482132],"radius":0.13272000284524055},{"icon":"bench","file":"bench.glb","originalFile":"furniture/Models/GLTF format/bench.glb","sourceSha256":"ba05a6d23a5a5a44da016757632070e47ff7587ce10e2f6d6d52328b4cf5489b","sha256":"21bd02dce1f980aff3bc22c916bdcbefa3db2fa11bd5dbbc9fbb07830f9bd87b","bytes":17280,"triangles":170,"batches":1,"geometryBytes":16320,"size":[0.4000000059604645,0.4699999988079071,0.20000000298023224],"radius":0.22360680108197992},{"icon":"sofa","file":"loungeSofa.glb","originalFile":"furniture/Models/GLTF format/loungeSofa.glb","sourceSha256":"1886b811c0d3ad0d8525a4fd43adf4112c497c8e0ed906f06877ca3517f4c7dd","sha256":"a4a0b16aa48731b61fcc08302c8bca8d2ff9e1ae41e77893ed9f2091f8a35ee2","bytes":13952,"triangles":128,"batches":2,"geometryBytes":12288,"size":[0.9799999594688416,0.46000000834465027,0.4100000262260437],"radius":0.5311543895291386},{"icon":"cabinet","file":"kitchenCabinet.glb","originalFile":"furniture/Models/GLTF format/kitchenCabinet.glb","sourceSha256":"7238c57778935ae25db5e57e9f7af3ba7068c71b005ff7cfbff3b6f3b1a13200","sha256":"0f9b3693f3de853fa68148bb71c9e29ecf38e784bfa7e39a7fb3cc78f76ce972","bytes":12604,"triangles":114,"batches":2,"geometryBytes":10944,"size":[0.4300000071525574,0.44999998807907104,0.44999998807907104],"radius":0.3112073245532484},{"icon":"stove","file":"kitchenStove.glb","originalFile":"furniture/Models/GLTF format/kitchenStove.glb","sourceSha256":"3239edb36295dfca9530a9b9a6ad0aff98ce62e7cf8d13ca2a5a1a6b2a904656","sha256":"6d1deee24fa30890cbfc540fa6e711fce2ab68cc82d0b68e104074c2c161b170","bytes":81356,"triangles":830,"batches":2,"geometryBytes":79680,"size":[0.4300000071525574,0.44999998807907104,0.44999998807907104],"radius":0.3112073245532484},{"icon":"refrigerator","file":"kitchenFridge.glb","originalFile":"furniture/Models/GLTF format/kitchenFridge.glb","sourceSha256":"8af4f4bbb1b5525ad8226e97926a5af60fa8fb20a3cb74dbda5328a9d320dbab","sha256":"69be9a8c3d3a804c494b92220710c61a2f87a4c3600922d0da3d5020eb3aef4c","bytes":25668,"triangles":250,"batches":2,"geometryBytes":24000,"size":[0.4300000071525574,0.9200000166893005,0.29193389415740967],"radius":0.2598679494998898},{"icon":"sink","file":"kitchenSink.glb","originalFile":"furniture/Models/GLTF format/kitchenSink.glb","sourceSha256":"7b9610277d71f00dcf1bba49cf4d98d77ce5177e84bf76c7da2f8893e542f743","sha256":"7063bb1597aae39279a3430952338d6f72fe8bccba5b93b143b930ba992f3878","bytes":32196,"triangles":318,"batches":2,"geometryBytes":30528,"size":[0.4300000071525574,0.4899999797344208,0.44999998807907104],"radius":0.3112073245532484},{"icon":"toilet","file":"toilet.glb","originalFile":"furniture/Models/GLTF format/toilet.glb","sourceSha256":"16165cfd03c56c2cb443b800570810a22ef770f65e7a468f6761d9dc14eaaeae","sha256":"42fcec7b0b225b544dcf05bde35f17e598cdf01c8f5f15f36aa55c76ab91652f","bytes":23732,"triangles":230,"batches":2,"geometryBytes":22080,"size":[0.31255000829696655,0.450965017080307,0.4771767109632492],"radius":0.2827908769988002},{"icon":"bathtub","file":"bathtub.glb","originalFile":"furniture/Models/GLTF format/bathtub.glb","sourceSha256":"54c405c7035aab63dc41e709dc3c50fc5bcfbc4cddc91ffc54188075a6d25d01","sha256":"f15e3a3316060b4ddca2dd1350109adc26bc11f1a4784e8dcb23465ccdb3cb5a","bytes":59480,"triangles":602,"batches":2,"geometryBytes":57792,"size":[0.5600000023841858,0.41999998688697815,1.190000057220459],"radius":0.6478308291120068},{"icon":"potted-plant","file":"pottedPlant.glb","originalFile":"furniture/Models/GLTF format/pottedPlant.glb","sourceSha256":"5b760eda2766f75fda36b2c5df652a1662f82981ef64cd8fa7fe7bcd386b3a15","sha256":"d6be69190662ff9b0388b7332f9a8d8e0530d1373b5a3c08deea336ea09613e7","bytes":7420,"triangles":60,"batches":2,"geometryBytes":5760,"size":[0.21205927431583405,0.6540167927742004,0.24146194756031036],"radius":0.12073097378015518},{"icon":"light","file":"lampRoundFloor.glb","originalFile":"furniture/Models/GLTF format/lampRoundFloor.glb","sourceSha256":"50fe1b5b588edf15bfa9cc880f71a02a4fda6036350b24733d0ef4de5cc5e908","sha256":"f663a0f42fc9277cfc365f4ccc335fe8a80d621159dae74922dd8c3947fd2b36","bytes":8956,"triangles":76,"batches":2,"geometryBytes":7296,"size":[0.15203941613435745,0.8600000143051147,0.17555999755859375],"radius":0.08778000315811903},{"icon":"statue","file":"statue_ring.glb","originalFile":"nature/Models/GLTF format/statue_ring.glb","sourceSha256":"5c62e4165f7a76436faa0b20e98b47d0a9e5021dcbf2a0eef0cdf0912180f02c","sha256":"013b58818fbebae606f6cb9b5bc7f769ac6f55dbf5bc1c486787078a8761d29c","bytes":8976,"triangles":76,"batches":2,"geometryBytes":7296,"size":[0.6000000238418579,0.7964101441204547,0.4000000059604645],"radius":0.3605551391183468},{"icon":"chest","file":"chest.glb","originalFile":"survival/Models/GLB format/chest.glb","sourceSha256":"84b03023e425cc1f96c6d0b0f352608be9e8e01b112790e6b00b8651bf84379b","sha256":"dfaf5cf144a7465e313e87d08eb82b0039202500256a6e89f774d0a1e9c35946","bytes":32580,"triangles":322,"batches":2,"geometryBytes":30912,"size":[0.2603999972343445,0.2571914792060852,0.2720249891281128],"radius":0.18828552338788324},{"icon":"barrel","file":"barrel.glb","originalFile":"survival/Models/GLB format/barrel.glb","sourceSha256":"3a0d12f6bdd1badd361f64ce0fbbf878a4ccfc2de8ff1ac4ed4c1aea2a9ee04a","sha256":"3b1f6cdf0e406cdf9630649a1eca8bdf8428a9f07d794bafd70406e63dafa6e3","bytes":41228,"triangles":412,"batches":2,"geometryBytes":39552,"size":[0.23649999499320984,0.3440000116825104,0.23649999499320984],"radius":0.13364122923364707},{"icon":"tent","file":"tent-canvas.glb","originalFile":"survival/Models/GLB format/tent-canvas.glb","sourceSha256":"efc4bca46a22e4cc4fe391aeafba161c24bc39bfa75e192c57eaacaf686f9717","sha256":"8baaab74d57cfa38d73963dccd6fe711006d28ebef0145a410494625f4cc0b9d","bytes":15868,"triangles":148,"batches":2,"geometryBytes":14208,"size":[0.5607622265815735,0.4913683533668518,0.5610000491142273],"radius":0.37933337775768333},{"icon":"car","file":"sedan.glb","originalFile":"car/Models/GLB format/sedan.glb","sourceSha256":"b532ea7d2c59f7f6b22b138cf1955218a2c1898f1cea932af4d3fd563c3959b7","sha256":"99b2d9141e842d542c406b83a3f8701519cad9f5a4f4d046b7b0d6f8cf12c0f8","bytes":197452,"triangles":2032,"batches":3,"geometryBytes":195072,"size":[1.5,1.2999999523162844,2.549999952316284],"radius":1.3472214803586575}]'), Vs = new Map(Ks.map((e) => [e.icon, {
  size: new A().fromArray(e.size),
  radius: e.radius
}])), Ye = {
  table: [1.2, 3],
  chair: [0.75, 1.35],
  bed: [0.4, 0.85],
  shelf: [1, 8],
  tree: [0.6, 1.7],
  rock: [0.6, 1.7],
  stool: [0.8, 1.4],
  bench: [1.5, 3.2],
  sofa: [1.6, 3.4],
  cabinet: [0.7, 1.4],
  chest: [0.7, 1.4],
  barrel: [0.8, 1.25],
  stove: [0.75, 1.3],
  refrigerator: [1, 1.85],
  sink: [0.75, 1.3],
  toilet: [0.45, 0.9],
  bathtub: [0.32, 0.65],
  car: [0.4, 0.8],
  statue: [1, 2],
  tent: [0.75, 1.35],
  "potted-plant": [0.65, 1.3],
  light: [0.65, 1.3]
}, Xs = /* @__PURE__ */ new Set([
  "tree",
  "rock",
  "stool",
  "barrel",
  "potted-plant",
  "light"
]), Ys = {
  tree: "forest",
  rock: "stone",
  sofa: "fabric",
  cabinet: "wood",
  chest: "wood",
  barrel: "wood",
  stove: "metal",
  refrigerator: "metal",
  sink: "tile",
  toilet: "tile",
  bathtub: "tile",
  car: "metal",
  statue: "stone",
  tent: "fabric",
  "potted-plant": "tile",
  light: "metal"
};
function ft(e) {
  if (se(e) || ["wall", "grid"].includes(e.category) || !e.icon || !Object.hasOwn(Ye, e.icon)) return;
  const t = e.icon;
  if (e.shape === "circle") return Xs.has(t) ? t : void 0;
  if (e.shape !== "rect") return;
  const { width: o, height: s } = Je(e), n = o / s, [i, a] = Ye[t];
  return n >= i && n <= a ? t : void 0;
}
function pt(e, t, { size: o, radius: s }, n, i) {
  const a = t === "shelf" ? Math.max(1, Math.ceil(n / i / (o.x / o.z))) : 1, r = Math.min((t === "tree" ? 3 : 2.5) / o.y, e.shape === "circle" ? n / (2 * s) : Math.min(n / a / o.x, i / o.z));
  return {
    count: a,
    scale: r,
    height: o.y * r
  };
}
function Ws(e, t, o, s) {
  return pt(e, t, Vs.get(t), o, s).height;
}
function Zs(e, t, o, s, n, i, a, r) {
  const { size: l } = s, { count: h, scale: c, height: d } = pt(t, o, s, n, i), u = t.material ? t : {
    ...t,
    material: Ys[o] || "unknown"
  };
  for (const p of s.parts) {
    const b = a.own(p.geometry.clone());
    if (b.scale(c, c, c), o === "table") {
      const w = b.getAttribute("position"), S = l.x * c / 2, L = n / 2 - S;
      for (let T = 0; T < w.count; T++) {
        if (w.getY(T) < l.y * c * 0.55) continue;
        const O = w.getX(T);
        w.setX(T, O + Math.max(-1, Math.min(1, O / (S * 0.5))) * L);
      }
      b.computeVertexNormals();
    }
    b.computeBoundingBox(), b.computeBoundingSphere();
    let y = u;
    p.role === "soft" || p.role === "shade" ? y = {
      ...t,
      material: "bed-sheet"
    } : p.role === "foliage" ? y = {
      ...t,
      material: "forest"
    } : p.role === "window" ? y = {
      ...t,
      material: "glass"
    } : p.role === "wood" ? y = {
      ...t,
      material: "wood"
    } : p.role === "bark" && (!t.material || ["grass", "forest"].includes(t.material)) && (y = {
      ...t,
      material: "wood"
    });
    const g = p.role === "detail" ? o === "car" ? -0.78 : -0.25 : p.role === "bark" ? -0.22 : p.role === "window" ? -0.3 : p.role === "soft" ? 0.12 : 0, m = o === "light" && p.role === "shade" ? r.lampShade(t, g) : r.mesh(y, g), _ = a.own(new ae(b, m, h));
    for (let w = 0; w < h; w++) _.setMatrixAt(w, new K().makeTranslation((w - (h - 1) / 2) * l.x * c, 0, 0));
    const f = o === "light" && p.role === "shade" && m.emissiveIntensity > 0 && m.emissive.getHex() !== 0;
    _.castShadow = m.opacity >= 0.8 && !f, _.receiveShadow = !0, e.add(_);
  }
  return d;
}
function qs(e, t, o, s, n, i) {
  const a = dt(t, o), r = [], l = Math.max(0.45, a.reduce((d, u) => d + u.length, 0) / 128);
  let h = 0;
  for (const d of a) {
    for (const u of [0.22, 0.5]) r.push(new K().makeRotationY(d.rotation).scale(new A(d.length, 0.045, 0.04)).setPosition(d.x, u, d.z));
    for (; h <= d.length; ) {
      const u = h - d.length / 2;
      r.push(new K().makeScale(0.065, 0.58, 0.065).setPosition(d.x + Math.cos(d.rotation) * u, 0.29, d.z - Math.sin(d.rotation) * u)), h += l;
    }
    h -= d.length;
  }
  if (!o && t.length) {
    const d = t.at(-1);
    r.push(new K().makeScale(0.065, 0.58, 0.065).setPosition(d.x, 0.29, d.y));
  }
  const c = i.own(new ae(s, n, r.length));
  return r.forEach((d, u) => c.setMatrixAt(u, d)), c.castShadow = n.opacity >= 0.8, c.receiveShadow = !0, e.add(c), 0.58;
}
function $s(e, t) {
  let o = !1;
  for (let s = 0, n = t.length - 1; s < t.length; n = s++) {
    const i = t[s], a = t[n];
    i.y > e.y != a.y > e.y && e.x < (a.x - i.x) * (e.y - i.y) / (a.y - i.y) + i.x && (o = !o);
  }
  return o;
}
function Qs(e, t, o, s = Ds(e)) {
  const n = new ut(), i = new le();
  try {
    const a = Gs(n, t, e.lighting), r = zs(n, a), l = n.own(new Yt(1, 1, 1)), h = n.own(new tt(0.5, 8, 6)), c = wt(e.elements), d = /* @__PURE__ */ new Map(), u = [], p = new te();
    for (const [y, g] of At(e.elements).entries()) {
      const m = Cs(g, s.scale), _ = new le();
      let f = 0.015, w = !1;
      const S = ks(g), L = ft(g), T = L && o?.get(L), O = g.icon === "fence" && ["path", "curve"].includes(g.shape) && !se(g) && !["wall", "grid"].includes(g.category), E = !S && !se(g) && Ie(g) && (xt(g) || ["furniture", "decoration"].includes(g.category));
      if (g.shape === "icon" || g.shape === "label") f = 0.08;
      else if (g.category === "wall") {
        f = 1.1;
        const M = dt(m.points, m.closed), N = n.own(new ae(l, a.mesh(g, 0.12), M.length));
        N.castShadow = N.receiveShadow = !0, _.add(N), M.forEach((D, F) => {
          const V = new K().makeRotationY(D.rotation).scale(new A(D.length, f, 0.08)).setPosition(D.x, f / 2, D.z);
          N.setMatrixAt(F, V);
        }), u.push(N);
      } else if (O) f = qs(_, m.points, m.closed, l, a.mesh(g), n);
      else if (L && T) f = Zs(_, g, L, T, m.width, m.depth, n, a);
      else if (S) f = r(_, g, S, m.width, m.depth);
      else if (Ie(g)) {
        f = E ? 0.2 : 0.015;
        const M = new ue(n.own(Is(m.points, f)), a.mesh(g));
        M.castShadow = f > 0.1, M.receiveShadow = !0, _.add(M);
      } else if (g.category === "road" || g.category === "water") {
        const M = new ue(n.own(Us(m.points, m.closed, g.category === "road" ? 0.16 : 0.08).translate(0, f, 0)), a.mesh(g));
        M.receiveShadow = !0, _.add(M);
      }
      if (S || T) {
        const M = new te().setFromObject(_), N = Math.max(m.width, m.depth) * 1e-6;
        w = M.min.x > -m.width / 2 + N || M.max.x < m.width / 2 - N || M.min.z > -m.depth / 2 + N || M.max.z < m.depth / 2 - N;
      }
      if (m.points.length && (w || !S && !T)) {
        const M = new nt(n.own(Fs(m.points, m.closed, w ? 0.019 : g.category === "wall" ? 0.012 : f + 4e-3)), a.line(g));
        M.computeLineDistances(), _.add(M);
      }
      const I = (c.get(g.id) || []).flatMap((M) => {
        const N = new k((M.x - m.center[0]) / s.scale, (M.y - m.center[1]) / s.scale), D = M.size / s.scale / 2;
        return Array.from({ length: 8 }, (F, V) => new k(N.x + D * Math.cos(V * Math.PI / 4), N.y + D * Math.sin(V * Math.PI / 4))).every((F) => $s(F, m.points)) ? [{
          center: N,
          radius: D
        }] : [];
      });
      if (I.length) {
        const M = new ae(h, a.mesh(g, -0.13), I.length);
        I.forEach(({ center: N, radius: D }, F) => M.setMatrixAt(F, new K().makeScale(D * 2, D * 1.4, D * 2).setPosition(N.x, D * 0.7 + f, N.y))), M.castShadow = M.receiveShadow = !0, n.own(M), _.add(M);
      }
      if (_.position.copy(s.point(...m.center, y * 2e-3)), _.rotation.y = m.rotation, i.add(_), L) {
        const M = Ws(g, L, m.width, m.depth) + 0.1;
        _.updateMatrix(), p.union(new te(new A(-m.width / 2, 0, -m.depth / 2), new A(m.width / 2, M, m.depth / 2)).applyMatrix4(_.matrix));
      }
      se(g) ? d.set(g.id, s.point(...m.center, _.position.y + 0.025)) : S || L || E ? d.set(g.id, s.point(...m.center, _.position.y + f + 0.1)) : d.set(g.id, s.point(...Rt(g, 0), _.position.y + (O ? f : 0) + 0.1));
    }
    const b = new te().setFromObject(i).union(p);
    for (const y of d.values()) b.expandByPoint(y);
    return {
      group: i,
      anchors: d,
      bounds: b,
      frame: s,
      updateWalls(y) {
        for (const g of u) g.scale.y = y ? 0.2 / 1.1 : 1;
      },
      dispose() {
        i.removeFromParent(), n.dispose(), i.clear();
      }
    };
  } catch (a) {
    throw n.dispose(), i.clear(), a;
  }
}
var We = (e, t) => e.x < t.x + t.w + 3 && e.x + e.w + 3 > t.x && e.y < t.y + t.h + 3 && e.y + e.h + 3 > t.y;
function Js(e, t, o, s = []) {
  const n = /* @__PURE__ */ new Map(), i = [...e].sort((c, d) => c.priority - d.priority || c.id.localeCompare(d.id)), a = [...s], r = i.filter((c) => c.badge).map(({ anchor: c }) => ({
    x: c.x - 3,
    y: c.y - 3,
    w: 6,
    h: 6
  })), l = (c) => c.x >= 3 && c.y >= 3 && c.x + c.w <= t - 3 && c.y + c.h <= o - 3, h = (c) => l(c) && !a.some((d) => We(c, d)) && !r.some((d) => We(c, d));
  for (const c of i) {
    const d = { anchor: { ...c.anchor } };
    if (n.set(c.id, d), !c.badge) continue;
    const { w: u, h: p } = c.badge, { x: b, y } = c.anchor, g = [];
    for (const _ of [
      9,
      27,
      45
    ]) g.push({
      x: b - u / 2,
      y: y - p - _,
      w: u,
      h: p
    }, {
      x: b + _,
      y: y - p / 2,
      w: u,
      h: p
    }, {
      x: b - u - _,
      y: y - p / 2,
      w: u,
      h: p
    }, {
      x: b - u / 2,
      y: y + _,
      w: u,
      h: p
    });
    const m = g.map((_) => ({
      x: Math.max(3, Math.min(t - u - 3, _.x)),
      y: Math.max(3, Math.min(o - p - 3, _.y)),
      w: u,
      h: p
    }));
    d.badge = m.find(h) || m[0], a.push(d.badge);
  }
  for (const c of i) {
    if (!c.caption) continue;
    const d = n.get(c.id), { w: u, h: p } = c.caption, b = d.badge || {
      ...c.anchor,
      w: 0,
      h: 0
    };
    d.caption = [
      {
        x: b.x + (b.w - u) / 2,
        y: b.y - p - 5,
        w: u,
        h: p
      },
      {
        x: b.x + b.w + 6,
        y: b.y + (b.h - p) / 2,
        w: u,
        h: p
      },
      {
        x: b.x - u - 6,
        y: b.y + (b.h - p) / 2,
        w: u,
        h: p
      },
      {
        x: b.x + (b.w - u) / 2,
        y: b.y + b.h + 5,
        w: u,
        h: p
      }
    ].find(h), d.caption && a.push(d.caption);
  }
  return n;
}
function en(e, t, o) {
  const s = t.elements.filter((n) => n.label || se(n)).map((n) => {
    const i = se(n) && n.shape !== "label", a = n.actorKey === "player", r = a ? 0 : n.category === "door" ? 1 : n.category === "actor" ? 2 : i ? 3 : 4, l = n.label || Tt[n.category], h = document.createElement("span");
    h.className = `map-3d-label is-${n.category}${a ? " is-player" : ""}`, h.dataset.element = n.id, h.style.zIndex = String(10 - r), i && (h.setAttribute("role", "img"), h.setAttribute("aria-label", l));
    const c = Me(n, "");
    h.style.opacity = String(c.opacity);
    const d = document.createElement("span");
    d.className = "map-3d-glyph", d.setAttribute("aria-hidden", "true");
    const u = document.createElement("span");
    u.className = "map-3d-anchor", u.setAttribute("aria-hidden", "true");
    const p = document.createElement("span");
    p.className = "map-3d-leader", p.setAttribute("aria-hidden", "true"), i && h.append(p, u, d);
    const b = document.createElement("span");
    return b.textContent = l, b.className = "map-3d-label-text", i && b.setAttribute("aria-hidden", "true"), h.append(b), e.append(h), {
      element: n,
      node: h,
      glyph: d,
      dot: u,
      leader: p,
      caption: b,
      recipe: c,
      hasGlyph: i,
      priority: r,
      anchor: o.get(n.id)
    };
  });
  return {
    symbols(n) {
      for (const i of s)
        i.glyph.textContent = n ? i.recipe.icon : i.recipe.fallback, i.glyph.classList.toggle("has-symbols", n);
    },
    update(n, i, a, r) {
      const l = [];
      for (const { element: u, node: p, caption: b, glyph: y, anchor: g, hasGlyph: m, priority: _ } of s) {
        p.style.visibility = "hidden", b.hidden = !r;
        const f = g.clone().project(n), w = (f.x + 1) * i / 2, S = (1 - f.y) * a / 2;
        f.z < -1 || f.z > 1 || w < 0 || w > i || S < 0 || S > a || l.push({
          id: u.id,
          anchor: {
            x: w,
            y: S
          },
          priority: _,
          badge: m ? {
            w: y.offsetWidth,
            h: y.offsetHeight
          } : void 0,
          caption: r ? {
            w: b.offsetWidth,
            h: b.offsetHeight
          } : void 0
        });
      }
      const h = e.parentElement?.querySelector(".map-viewport-controls")?.getBoundingClientRect(), c = e.getBoundingClientRect(), d = Js(l, i, a, h ? [{
        x: h.x - c.x,
        y: h.y - c.y,
        w: h.width,
        h: h.height
      }] : []);
      for (const { element: u, node: p, caption: b, dot: y, leader: g } of s) {
        const m = d.get(u.id), _ = m?.badge || m?.caption;
        if (b.style.visibility = m?.caption ? "inherit" : "hidden", !(!m || !_) && (p.style.visibility = "visible", p.style.transform = `translate(${_.x}px, ${_.y}px)`, p.style.width = `${_.w}px`, p.style.height = `${_.h}px`, m.caption && (b.style.left = `${m.caption.x - _.x}px`, b.style.top = `${m.caption.y - _.y}px`), m.badge)) {
          const f = m.anchor.x - _.x, w = m.anchor.y - _.y;
          y.style.transform = `translate(${f}px, ${w}px)`;
          const S = Math.max(0, Math.min(_.w, f)), L = Math.max(0, Math.min(_.h, w));
          g.style.width = `${Math.hypot(S - f, L - w)}px`, g.style.transform = `translate(${f}px, ${w}px) rotate(${Math.atan2(L - w, S - f)}rad)`;
        }
      }
    },
    dispose() {
      for (const { node: n } of s) n.remove();
    }
  };
}
var tn = class extends Kt {
  constructor(e) {
    super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(t) {
      return new rn(t);
    }), this.register(function(t) {
      return new cn(t);
    }), this.register(function(t) {
      return new bn(t);
    }), this.register(function(t) {
      return new yn(t);
    }), this.register(function(t) {
      return new _n(t);
    }), this.register(function(t) {
      return new hn(t);
    }), this.register(function(t) {
      return new dn(t);
    }), this.register(function(t) {
      return new un(t);
    }), this.register(function(t) {
      return new fn(t);
    }), this.register(function(t) {
      return new an(t);
    }), this.register(function(t) {
      return new pn(t);
    }), this.register(function(t) {
      return new ln(t);
    }), this.register(function(t) {
      return new gn(t);
    }), this.register(function(t) {
      return new mn(t);
    }), this.register(function(t) {
      return new nn(t);
    }), this.register(function(t) {
      return new Tn(t);
    }), this.register(function(t) {
      return new wn(t);
    });
  }
  load(e, t, o, s) {
    const n = this;
    let i;
    if (this.resourcePath !== "") i = this.resourcePath;
    else if (this.path !== "") {
      const l = he.extractUrlBase(e);
      i = he.resolveURL(l, this.path);
    } else i = he.extractUrlBase(e);
    this.manager.itemStart(e);
    const a = function(l) {
      s ? s(l) : console.error(l), n.manager.itemError(e), n.manager.itemEnd(e);
    }, r = new ct(this.manager);
    r.setPath(this.path), r.setResponseType("arraybuffer"), r.setRequestHeader(this.requestHeader), r.setWithCredentials(this.withCredentials), r.load(e, function(l) {
      try {
        n.parse(l, i, function(h) {
          t(h), n.manager.itemEnd(e);
        }, a);
      } catch (h) {
        a(h);
      }
    }, o, a);
  }
  setDRACOLoader(e) {
    return this.dracoLoader = e, this;
  }
  setKTX2Loader(e) {
    return this.ktx2Loader = e, this;
  }
  setMeshoptDecoder(e) {
    return this.meshoptDecoder = e, this;
  }
  register(e) {
    return this.pluginCallbacks.indexOf(e) === -1 && this.pluginCallbacks.push(e), this;
  }
  unregister(e) {
    return this.pluginCallbacks.indexOf(e) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this;
  }
  parse(e, t, o, s) {
    let n;
    const i = {}, a = {}, r = new TextDecoder();
    if (typeof e == "string") n = JSON.parse(e);
    else if (e instanceof ArrayBuffer) if (r.decode(new Uint8Array(e, 0, 4)) === mt) {
      try {
        i[R.KHR_BINARY_GLTF] = new xn(e);
      } catch (h) {
        s && s(h);
        return;
      }
      n = JSON.parse(i[R.KHR_BINARY_GLTF].content);
    } else n = JSON.parse(r.decode(e));
    else n = e;
    if (n.asset === void 0 || n.asset.version[0] < 2) {
      s && s(/* @__PURE__ */ new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const l = new Cn(n, {
      path: t || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    l.fileLoader.setRequestHeader(this.requestHeader);
    for (let h = 0; h < this.pluginCallbacks.length; h++) {
      const c = this.pluginCallbacks[h](l);
      c.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), a[c.name] = c, i[c.name] = !0;
    }
    if (n.extensionsUsed) for (let h = 0; h < n.extensionsUsed.length; ++h) {
      const c = n.extensionsUsed[h], d = n.extensionsRequired || [];
      switch (c) {
        case R.KHR_MATERIALS_UNLIT:
          i[c] = new on();
          break;
        case R.KHR_DRACO_MESH_COMPRESSION:
          i[c] = new En(n, this.dracoLoader);
          break;
        case R.KHR_TEXTURE_TRANSFORM:
          i[c] = new Sn();
          break;
        case R.KHR_MESH_QUANTIZATION:
          i[c] = new Mn();
          break;
        default:
          d.indexOf(c) >= 0 && a[c] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + c + '".');
      }
    }
    l.setExtensions(i), l.setPlugins(a), l.parse(o, s);
  }
  parseAsync(e, t) {
    const o = this;
    return new Promise(function(s, n) {
      o.parse(e, t, s, n);
    });
  }
};
function sn() {
  let e = {};
  return {
    get: function(t) {
      return e[t];
    },
    add: function(t, o) {
      e[t] = o;
    },
    remove: function(t) {
      delete e[t];
    },
    removeAll: function() {
      e = {};
    }
  };
}
var R = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_MATERIALS_BUMP: "EXT_materials_bump",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_TEXTURE_AVIF: "EXT_texture_avif",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
}, nn = class {
  constructor(e) {
    this.parser = e, this.name = R.KHR_LIGHTS_PUNCTUAL, this.cache = {
      refs: {},
      uses: {}
    };
  }
  _markDefs() {
    const e = this.parser, t = this.parser.json.nodes || [];
    for (let o = 0, s = t.length; o < s; o++) {
      const n = t[o];
      n.extensions && n.extensions[this.name] && n.extensions[this.name].light !== void 0 && e._addNodeRef(this.cache, n.extensions[this.name].light);
    }
  }
  _loadLight(e) {
    const t = this.parser, o = "light:" + e;
    let s = t.cache.get(o);
    if (s) return s;
    const n = t.json, i = ((n.extensions && n.extensions[this.name] || {}).lights || [])[e];
    let a;
    const r = new W(16777215);
    i.color !== void 0 && r.setRGB(i.color[0], i.color[1], i.color[2], Q);
    const l = i.range !== void 0 ? i.range : 0;
    switch (i.type) {
      case "directional":
        a = new ve(r), a.target.position.set(0, 0, -1), a.add(a.target);
        break;
      case "point":
        a = new at(r), a.distance = l;
        break;
      case "spot":
        a = new ns(r), a.distance = l, i.spot = i.spot || {}, i.spot.innerConeAngle = i.spot.innerConeAngle !== void 0 ? i.spot.innerConeAngle : 0, i.spot.outerConeAngle = i.spot.outerConeAngle !== void 0 ? i.spot.outerConeAngle : Math.PI / 4, a.angle = i.spot.outerConeAngle, a.penumbra = 1 - i.spot.innerConeAngle / i.spot.outerConeAngle, a.target.position.set(0, 0, -1), a.add(a.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + i.type);
    }
    return a.position.set(0, 0, 0), X(a, i), i.intensity !== void 0 && (a.intensity = i.intensity), a.name = t.createUniqueName(i.name || "light_" + e), s = Promise.resolve(a), t.cache.add(o, s), s;
  }
  getDependency(e, t) {
    if (e === "light")
      return this._loadLight(t);
  }
  createNodeAttachment(e) {
    const t = this, o = this.parser, s = o.json.nodes[e], n = (s.extensions && s.extensions[this.name] || {}).light;
    return n === void 0 ? null : this._loadLight(n).then(function(i) {
      return o._getNodeRef(t.cache, n, i);
    });
  }
}, on = class {
  constructor() {
    this.name = R.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return ce;
  }
  extendParams(e, t, o) {
    const s = [];
    e.color = new W(1, 1, 1), e.opacity = 1;
    const n = t.pbrMetallicRoughness;
    if (n) {
      if (Array.isArray(n.baseColorFactor)) {
        const i = n.baseColorFactor;
        e.color.setRGB(i[0], i[1], i[2], Q), e.opacity = i[3];
      }
      n.baseColorTexture !== void 0 && s.push(o.assignTexture(e, "map", n.baseColorTexture, ne));
    }
    return Promise.all(s);
  }
}, an = class {
  constructor(e) {
    this.parser = e, this.name = R.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(e, t) {
    const o = this.parser.json.materials[e];
    if (!o.extensions || !o.extensions[this.name]) return Promise.resolve();
    const s = o.extensions[this.name].emissiveStrength;
    return s !== void 0 && (t.emissiveIntensity = s), Promise.resolve();
  }
}, rn = class {
  constructor(e) {
    this.parser = e, this.name = R.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : Y;
  }
  extendMaterialParams(e, t) {
    const o = this.parser, s = o.json.materials[e];
    if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
    const n = [], i = s.extensions[this.name];
    if (i.clearcoatFactor !== void 0 && (t.clearcoat = i.clearcoatFactor), i.clearcoatTexture !== void 0 && n.push(o.assignTexture(t, "clearcoatMap", i.clearcoatTexture)), i.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = i.clearcoatRoughnessFactor), i.clearcoatRoughnessTexture !== void 0 && n.push(o.assignTexture(t, "clearcoatRoughnessMap", i.clearcoatRoughnessTexture)), i.clearcoatNormalTexture !== void 0 && (n.push(o.assignTexture(t, "clearcoatNormalMap", i.clearcoatNormalTexture)), i.clearcoatNormalTexture.scale !== void 0)) {
      const a = i.clearcoatNormalTexture.scale;
      t.clearcoatNormalScale = new k(a, a);
    }
    return Promise.all(n);
  }
}, cn = class {
  constructor(e) {
    this.parser = e, this.name = R.KHR_MATERIALS_DISPERSION;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : Y;
  }
  extendMaterialParams(e, t) {
    const o = this.parser.json.materials[e];
    if (!o.extensions || !o.extensions[this.name]) return Promise.resolve();
    const s = o.extensions[this.name];
    return t.dispersion = s.dispersion !== void 0 ? s.dispersion : 0, Promise.resolve();
  }
}, ln = class {
  constructor(e) {
    this.parser = e, this.name = R.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : Y;
  }
  extendMaterialParams(e, t) {
    const o = this.parser, s = o.json.materials[e];
    if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
    const n = [], i = s.extensions[this.name];
    return i.iridescenceFactor !== void 0 && (t.iridescence = i.iridescenceFactor), i.iridescenceTexture !== void 0 && n.push(o.assignTexture(t, "iridescenceMap", i.iridescenceTexture)), i.iridescenceIor !== void 0 && (t.iridescenceIOR = i.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), i.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = i.iridescenceThicknessMinimum), i.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = i.iridescenceThicknessMaximum), i.iridescenceThicknessTexture !== void 0 && n.push(o.assignTexture(t, "iridescenceThicknessMap", i.iridescenceThicknessTexture)), Promise.all(n);
  }
}, hn = class {
  constructor(e) {
    this.parser = e, this.name = R.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : Y;
  }
  extendMaterialParams(e, t) {
    const o = this.parser, s = o.json.materials[e];
    if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
    const n = [];
    t.sheenColor = new W(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1;
    const i = s.extensions[this.name];
    if (i.sheenColorFactor !== void 0) {
      const a = i.sheenColorFactor;
      t.sheenColor.setRGB(a[0], a[1], a[2], Q);
    }
    return i.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = i.sheenRoughnessFactor), i.sheenColorTexture !== void 0 && n.push(o.assignTexture(t, "sheenColorMap", i.sheenColorTexture, ne)), i.sheenRoughnessTexture !== void 0 && n.push(o.assignTexture(t, "sheenRoughnessMap", i.sheenRoughnessTexture)), Promise.all(n);
  }
}, dn = class {
  constructor(e) {
    this.parser = e, this.name = R.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : Y;
  }
  extendMaterialParams(e, t) {
    const o = this.parser, s = o.json.materials[e];
    if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
    const n = [], i = s.extensions[this.name];
    return i.transmissionFactor !== void 0 && (t.transmission = i.transmissionFactor), i.transmissionTexture !== void 0 && n.push(o.assignTexture(t, "transmissionMap", i.transmissionTexture)), Promise.all(n);
  }
}, un = class {
  constructor(e) {
    this.parser = e, this.name = R.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : Y;
  }
  extendMaterialParams(e, t) {
    const o = this.parser, s = o.json.materials[e];
    if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
    const n = [], i = s.extensions[this.name];
    t.thickness = i.thicknessFactor !== void 0 ? i.thicknessFactor : 0, i.thicknessTexture !== void 0 && n.push(o.assignTexture(t, "thicknessMap", i.thicknessTexture)), t.attenuationDistance = i.attenuationDistance || 1 / 0;
    const a = i.attenuationColor || [
      1,
      1,
      1
    ];
    return t.attenuationColor = new W().setRGB(a[0], a[1], a[2], Q), Promise.all(n);
  }
}, fn = class {
  constructor(e) {
    this.parser = e, this.name = R.KHR_MATERIALS_IOR;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : Y;
  }
  extendMaterialParams(e, t) {
    const o = this.parser.json.materials[e];
    if (!o.extensions || !o.extensions[this.name]) return Promise.resolve();
    const s = o.extensions[this.name];
    return t.ior = s.ior !== void 0 ? s.ior : 1.5, Promise.resolve();
  }
}, pn = class {
  constructor(e) {
    this.parser = e, this.name = R.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : Y;
  }
  extendMaterialParams(e, t) {
    const o = this.parser, s = o.json.materials[e];
    if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
    const n = [], i = s.extensions[this.name];
    t.specularIntensity = i.specularFactor !== void 0 ? i.specularFactor : 1, i.specularTexture !== void 0 && n.push(o.assignTexture(t, "specularIntensityMap", i.specularTexture));
    const a = i.specularColorFactor || [
      1,
      1,
      1
    ];
    return t.specularColor = new W().setRGB(a[0], a[1], a[2], Q), i.specularColorTexture !== void 0 && n.push(o.assignTexture(t, "specularColorMap", i.specularColorTexture, ne)), Promise.all(n);
  }
}, mn = class {
  constructor(e) {
    this.parser = e, this.name = R.EXT_MATERIALS_BUMP;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : Y;
  }
  extendMaterialParams(e, t) {
    const o = this.parser, s = o.json.materials[e];
    if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
    const n = [], i = s.extensions[this.name];
    return t.bumpScale = i.bumpFactor !== void 0 ? i.bumpFactor : 1, i.bumpTexture !== void 0 && n.push(o.assignTexture(t, "bumpMap", i.bumpTexture)), Promise.all(n);
  }
}, gn = class {
  constructor(e) {
    this.parser = e, this.name = R.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : Y;
  }
  extendMaterialParams(e, t) {
    const o = this.parser, s = o.json.materials[e];
    if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
    const n = [], i = s.extensions[this.name];
    return i.anisotropyStrength !== void 0 && (t.anisotropy = i.anisotropyStrength), i.anisotropyRotation !== void 0 && (t.anisotropyRotation = i.anisotropyRotation), i.anisotropyTexture !== void 0 && n.push(o.assignTexture(t, "anisotropyMap", i.anisotropyTexture)), Promise.all(n);
  }
}, bn = class {
  constructor(e) {
    this.parser = e, this.name = R.KHR_TEXTURE_BASISU;
  }
  loadTexture(e) {
    const t = this.parser, o = t.json, s = o.textures[e];
    if (!s.extensions || !s.extensions[this.name]) return null;
    const n = s.extensions[this.name], i = t.options.ktx2Loader;
    if (!i) {
      if (o.extensionsRequired && o.extensionsRequired.indexOf(this.name) >= 0) throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return t.loadTextureImage(e, n.source, i);
  }
}, yn = class {
  constructor(e) {
    this.parser = e, this.name = R.EXT_TEXTURE_WEBP;
  }
  loadTexture(e) {
    const t = this.name, o = this.parser, s = o.json, n = s.textures[e];
    if (!n.extensions || !n.extensions[t]) return null;
    const i = n.extensions[t], a = s.images[i.source];
    let r = o.textureLoader;
    if (a.uri) {
      const l = o.options.manager.getHandler(a.uri);
      l !== null && (r = l);
    }
    return o.loadTextureImage(e, i.source, r);
  }
}, _n = class {
  constructor(e) {
    this.parser = e, this.name = R.EXT_TEXTURE_AVIF;
  }
  loadTexture(e) {
    const t = this.name, o = this.parser, s = o.json, n = s.textures[e];
    if (!n.extensions || !n.extensions[t]) return null;
    const i = n.extensions[t], a = s.images[i.source];
    let r = o.textureLoader;
    if (a.uri) {
      const l = o.options.manager.getHandler(a.uri);
      l !== null && (r = l);
    }
    return o.loadTextureImage(e, i.source, r);
  }
}, Tn = class {
  constructor(e) {
    this.name = R.EXT_MESHOPT_COMPRESSION, this.parser = e;
  }
  loadBufferView(e) {
    const t = this.parser.json, o = t.bufferViews[e];
    if (o.extensions && o.extensions[this.name]) {
      const s = o.extensions[this.name], n = this.parser.getDependency("buffer", s.buffer), i = this.parser.options.meshoptDecoder;
      if (!i || !i.supported) {
        if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0) throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return n.then(function(a) {
        const r = s.byteOffset || 0, l = s.byteLength || 0, h = s.count, c = s.byteStride, d = new Uint8Array(a, r, l);
        return i.decodeGltfBufferAsync ? i.decodeGltfBufferAsync(h, c, d, s.mode, s.filter).then(function(u) {
          return u.buffer;
        }) : i.ready.then(function() {
          const u = new ArrayBuffer(h * c);
          return i.decodeGltfBuffer(new Uint8Array(u), h, c, d, s.mode, s.filter), u;
        });
      });
    } else return null;
  }
}, wn = class {
  constructor(e) {
    this.name = R.EXT_MESH_GPU_INSTANCING, this.parser = e;
  }
  createNodeMesh(e) {
    const t = this.parser.json, o = t.nodes[e];
    if (!o.extensions || !o.extensions[this.name] || o.mesh === void 0) return null;
    const s = t.meshes[o.mesh];
    for (const r of s.primitives) if (r.mode !== B.TRIANGLES && r.mode !== B.TRIANGLE_STRIP && r.mode !== B.TRIANGLE_FAN && r.mode !== void 0) return null;
    const n = o.extensions[this.name].attributes, i = [], a = {};
    for (const r in n) i.push(this.parser.getDependency("accessor", n[r]).then((l) => (a[r] = l, a[r])));
    return i.length < 1 ? null : (i.push(this.parser.createNodeMesh(e)), Promise.all(i).then((r) => {
      const l = r.pop(), h = l.isGroup ? l.children : [l], c = r[0].count, d = [];
      for (const u of h) {
        const p = new K(), b = new A(), y = new fe(), g = new A(1, 1, 1), m = new ae(u.geometry, u.material, c);
        for (let _ = 0; _ < c; _++)
          a.TRANSLATION && b.fromBufferAttribute(a.TRANSLATION, _), a.ROTATION && y.fromBufferAttribute(a.ROTATION, _), a.SCALE && g.fromBufferAttribute(a.SCALE, _), m.setMatrixAt(_, p.compose(b, y, g));
        for (const _ in a) if (_ === "_COLOR_0") {
          const f = a[_];
          m.instanceColor = new Nt(f.array, f.itemSize, f.normalized);
        } else _ !== "TRANSLATION" && _ !== "ROTATION" && _ !== "SCALE" && u.geometry.setAttribute(_, a[_]);
        rt.prototype.copy.call(m, u), this.parser.assignFinalMaterial(m), d.push(m);
      }
      return l.isGroup ? (l.clear(), l.add(...d), l) : d[0];
    }));
  }
}, mt = "glTF", re = 12, Ze = {
  JSON: 1313821514,
  BIN: 5130562
}, xn = class {
  constructor(e) {
    this.name = R.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const t = new DataView(e, 0, re), o = new TextDecoder();
    if (this.header = {
      magic: o.decode(new Uint8Array(e.slice(0, 4))),
      version: t.getUint32(4, !0),
      length: t.getUint32(8, !0)
    }, this.header.magic !== mt) throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2) throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const s = this.header.length - re, n = new DataView(e, re);
    let i = 0;
    for (; i < s; ) {
      const a = n.getUint32(i, !0);
      i += 4;
      const r = n.getUint32(i, !0);
      if (i += 4, r === Ze.JSON) {
        const l = new Uint8Array(e, re + i, a);
        this.content = o.decode(l);
      } else if (r === Ze.BIN) {
        const l = re + i;
        this.body = e.slice(l, l + a);
      }
      i += a;
    }
    if (this.content === null) throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}, En = class {
  constructor(e, t) {
    if (!t) throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = R.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload();
  }
  decodePrimitive(e, t) {
    const o = this.json, s = this.dracoLoader, n = e.extensions[this.name].bufferView, i = e.extensions[this.name].attributes, a = {}, r = {}, l = {};
    for (const h in i) {
      const c = Ae[h] || h.toLowerCase();
      a[c] = i[h];
    }
    for (const h in e.attributes) {
      const c = Ae[h] || h.toLowerCase();
      if (i[h] !== void 0) {
        const d = o.accessors[e.attributes[h]];
        l[c] = oe[d.componentType].name, r[c] = d.normalized === !0;
      }
    }
    return t.getDependency("bufferView", n).then(function(h) {
      return new Promise(function(c, d) {
        s.decodeDracoFile(h, function(u) {
          for (const p in u.attributes) {
            const b = u.attributes[p], y = r[p];
            y !== void 0 && (b.normalized = y);
          }
          c(u);
        }, a, l, Q, d);
      });
    });
  }
}, Sn = class {
  constructor() {
    this.name = R.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, t) {
    return (t.texCoord === void 0 || t.texCoord === e.channel) && t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 || (e = e.clone(), t.texCoord !== void 0 && (e.channel = t.texCoord), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0), e;
  }
}, Mn = class {
  constructor() {
    this.name = R.KHR_MESH_QUANTIZATION;
  }
}, gt = class extends Pt {
  constructor(e, t, o, s) {
    super(e, t, o, s);
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, o = this.sampleValues, s = this.valueSize, n = e * s * 3 + s;
    for (let i = 0; i !== s; i++) t[i] = o[n + i];
    return t;
  }
  interpolate_(e, t, o, s) {
    const n = this.resultBuffer, i = this.sampleValues, a = this.valueSize, r = a * 2, l = a * 3, h = s - t, c = (o - t) / h, d = c * c, u = d * c, p = e * l, b = p - l, y = -2 * u + 3 * d, g = u - d, m = 1 - y, _ = g - d + c;
    for (let f = 0; f !== a; f++) {
      const w = i[b + f + a], S = i[b + f + r] * h, L = i[p + f + a], T = i[p + f] * h;
      n[f] = m * w + _ * S + y * L + g * T;
    }
    return n;
  }
}, Rn = new fe(), vn = class extends gt {
  interpolate_(e, t, o, s) {
    const n = super.interpolate_(e, t, o, s);
    return Rn.fromArray(n).normalize().toArray(n), n;
  }
}, B = {
  FLOAT: 5126,
  FLOAT_MAT3: 35675,
  FLOAT_MAT4: 35676,
  FLOAT_VEC2: 35664,
  FLOAT_VEC3: 35665,
  FLOAT_VEC4: 35666,
  LINEAR: 9729,
  REPEAT: 10497,
  SAMPLER_2D: 35678,
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6,
  UNSIGNED_BYTE: 5121,
  UNSIGNED_SHORT: 5123
}, oe = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, qe = {
  9728: $t,
  9729: lt,
  9984: ls,
  9985: Vt,
  9986: ms,
  9987: et
}, $e = {
  33071: is,
  33648: Lt,
  10497: it
}, we = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, Ae = {
  POSITION: "position",
  NORMAL: "normal",
  TANGENT: "tangent",
  TEXCOORD_0: "uv",
  TEXCOORD_1: "uv1",
  TEXCOORD_2: "uv2",
  TEXCOORD_3: "uv3",
  COLOR_0: "color",
  WEIGHTS_0: "skinWeight",
  JOINTS_0: "skinIndex"
}, q = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, An = {
  CUBICSPLINE: void 0,
  LINEAR: st,
  STEP: ts
}, xe = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function Ln(e) {
  return e.DefaultMaterial === void 0 && (e.DefaultMaterial = new Pe({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: 0
  })), e.DefaultMaterial;
}
function ee(e, t, o) {
  for (const s in o.extensions) e[s] === void 0 && (t.userData.gltfExtensions = t.userData.gltfExtensions || {}, t.userData.gltfExtensions[s] = o.extensions[s]);
}
function X(e, t) {
  t.extras !== void 0 && (typeof t.extras == "object" ? Object.assign(e.userData, t.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras));
}
function Pn(e, t, o) {
  let s = !1, n = !1, i = !1;
  for (let h = 0, c = t.length; h < c; h++) {
    const d = t[h];
    if (d.POSITION !== void 0 && (s = !0), d.NORMAL !== void 0 && (n = !0), d.COLOR_0 !== void 0 && (i = !0), s && n && i) break;
  }
  if (!s && !n && !i) return Promise.resolve(e);
  const a = [], r = [], l = [];
  for (let h = 0, c = t.length; h < c; h++) {
    const d = t[h];
    if (s) {
      const u = d.POSITION !== void 0 ? o.getDependency("accessor", d.POSITION) : e.attributes.position;
      a.push(u);
    }
    if (n) {
      const u = d.NORMAL !== void 0 ? o.getDependency("accessor", d.NORMAL) : e.attributes.normal;
      r.push(u);
    }
    if (i) {
      const u = d.COLOR_0 !== void 0 ? o.getDependency("accessor", d.COLOR_0) : e.attributes.color;
      l.push(u);
    }
  }
  return Promise.all([
    Promise.all(a),
    Promise.all(r),
    Promise.all(l)
  ]).then(function(h) {
    const c = h[0], d = h[1], u = h[2];
    return s && (e.morphAttributes.position = c), n && (e.morphAttributes.normal = d), i && (e.morphAttributes.color = u), e.morphTargetsRelative = !0, e;
  });
}
function On(e, t) {
  if (e.updateMorphTargets(), t.weights !== void 0) for (let o = 0, s = t.weights.length; o < s; o++) e.morphTargetInfluences[o] = t.weights[o];
  if (t.extras && Array.isArray(t.extras.targetNames)) {
    const o = t.extras.targetNames;
    if (e.morphTargetInfluences.length === o.length) {
      e.morphTargetDictionary = {};
      for (let s = 0, n = o.length; s < n; s++) e.morphTargetDictionary[o[s]] = s;
    } else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function Nn(e) {
  let t;
  const o = e.extensions && e.extensions[R.KHR_DRACO_MESH_COMPRESSION];
  if (o ? t = "draco:" + o.bufferView + ":" + o.indices + ":" + Ee(o.attributes) : t = e.indices + ":" + Ee(e.attributes) + ":" + e.mode, e.targets !== void 0) for (let s = 0, n = e.targets.length; s < n; s++) t += ":" + Ee(e.targets[s]);
  return t;
}
function Ee(e) {
  let t = "";
  const o = Object.keys(e).sort();
  for (let s = 0, n = o.length; s < n; s++) t += o[s] + ":" + e[o[s]] + ";";
  return t;
}
function Le(e) {
  switch (e) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
function kn(e) {
  return e.search(/\.jpe?g($|\?)/i) > 0 || e.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : e.search(/\.webp($|\?)/i) > 0 || e.search(/^data\:image\/webp/) === 0 ? "image/webp" : e.search(/\.ktx2($|\?)/i) > 0 || e.search(/^data\:image\/ktx2/) === 0 ? "image/ktx2" : "image/png";
}
var Dn = new K(), Cn = class {
  constructor(e = {}, t = {}) {
    this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new sn(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = {
      refs: {},
      uses: {}
    }, this.cameraCache = {
      refs: {},
      uses: {}
    }, this.lightCache = {
      refs: {},
      uses: {}
    }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let o = !1, s = -1, n = !1, i = -1;
    if (typeof navigator < "u") {
      const a = navigator.userAgent;
      o = /^((?!chrome|android).)*safari/i.test(a) === !0;
      const r = a.match(/Version\/(\d+)/);
      s = o && r ? parseInt(r[1], 10) : -1, n = a.indexOf("Firefox") > -1, i = n ? a.match(/Firefox\/([0-9]+)\./)[1] : -1;
    }
    typeof createImageBitmap > "u" || o && s < 17 || n && i < 98 ? this.textureLoader = new Ft(this.options.manager) : this.textureLoader = new Bt(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new ct(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(e, t) {
    const o = this, s = this.json, n = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(i) {
      return i._markDefs && i._markDefs();
    }), Promise.all(this._invokeAll(function(i) {
      return i.beforeRoot && i.beforeRoot();
    })).then(function() {
      return Promise.all([
        o.getDependencies("scene"),
        o.getDependencies("animation"),
        o.getDependencies("camera")
      ]);
    }).then(function(i) {
      const a = {
        scene: i[0][s.scene || 0],
        scenes: i[0],
        animations: i[1],
        cameras: i[2],
        asset: s.asset,
        parser: o,
        userData: {}
      };
      return ee(n, a, s), X(a, s), Promise.all(o._invokeAll(function(r) {
        return r.afterRoot && r.afterRoot(a);
      })).then(function() {
        for (const r of a.scenes) r.updateMatrixWorld();
        e(a);
      });
    }).catch(t);
  }
  _markDefs() {
    const e = this.json.nodes || [], t = this.json.skins || [], o = this.json.meshes || [];
    for (let s = 0, n = t.length; s < n; s++) {
      const i = t[s].joints;
      for (let a = 0, r = i.length; a < r; a++) e[i[a]].isBone = !0;
    }
    for (let s = 0, n = e.length; s < n; s++) {
      const i = e[s];
      i.mesh !== void 0 && (this._addNodeRef(this.meshCache, i.mesh), i.skin !== void 0 && (o[i.mesh].isSkinnedMesh = !0)), i.camera !== void 0 && this._addNodeRef(this.cameraCache, i.camera);
    }
  }
  _addNodeRef(e, t) {
    t !== void 0 && (e.refs[t] === void 0 && (e.refs[t] = e.uses[t] = 0), e.refs[t]++);
  }
  _getNodeRef(e, t, o) {
    if (e.refs[t] <= 1) return o;
    const s = o.clone(), n = (i, a) => {
      const r = this.associations.get(i);
      r != null && this.associations.set(a, r);
      for (const [l, h] of i.children.entries()) n(h, a.children[l]);
    };
    return n(o, s), s.name += "_instance_" + e.uses[t]++, s;
  }
  _invokeOne(e) {
    const t = Object.values(this.plugins);
    t.push(this);
    for (let o = 0; o < t.length; o++) {
      const s = e(t[o]);
      if (s) return s;
    }
    return null;
  }
  _invokeAll(e) {
    const t = Object.values(this.plugins);
    t.unshift(this);
    const o = [];
    for (let s = 0; s < t.length; s++) {
      const n = e(t[s]);
      n && o.push(n);
    }
    return o;
  }
  getDependency(e, t) {
    const o = e + ":" + t;
    let s = this.cache.get(o);
    if (!s) {
      switch (e) {
        case "scene":
          s = this.loadScene(t);
          break;
        case "node":
          s = this._invokeOne(function(n) {
            return n.loadNode && n.loadNode(t);
          });
          break;
        case "mesh":
          s = this._invokeOne(function(n) {
            return n.loadMesh && n.loadMesh(t);
          });
          break;
        case "accessor":
          s = this.loadAccessor(t);
          break;
        case "bufferView":
          s = this._invokeOne(function(n) {
            return n.loadBufferView && n.loadBufferView(t);
          });
          break;
        case "buffer":
          s = this.loadBuffer(t);
          break;
        case "material":
          s = this._invokeOne(function(n) {
            return n.loadMaterial && n.loadMaterial(t);
          });
          break;
        case "texture":
          s = this._invokeOne(function(n) {
            return n.loadTexture && n.loadTexture(t);
          });
          break;
        case "skin":
          s = this.loadSkin(t);
          break;
        case "animation":
          s = this._invokeOne(function(n) {
            return n.loadAnimation && n.loadAnimation(t);
          });
          break;
        case "camera":
          s = this.loadCamera(t);
          break;
        default:
          if (s = this._invokeOne(function(n) {
            return n != this && n.getDependency && n.getDependency(e, t);
          }), !s) throw new Error("Unknown type: " + e);
          break;
      }
      this.cache.add(o, s);
    }
    return s;
  }
  getDependencies(e) {
    let t = this.cache.get(e);
    if (!t) {
      const o = this, s = this.json[e + (e === "mesh" ? "es" : "s")] || [];
      t = Promise.all(s.map(function(n, i) {
        return o.getDependency(e, i);
      })), this.cache.add(e, t);
    }
    return t;
  }
  loadBuffer(e) {
    const t = this.json.buffers[e], o = this.fileLoader;
    if (t.type && t.type !== "arraybuffer") throw new Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
    if (t.uri === void 0 && e === 0) return Promise.resolve(this.extensions[R.KHR_BINARY_GLTF].body);
    const s = this.options;
    return new Promise(function(n, i) {
      o.load(he.resolveURL(t.uri, s.path), n, void 0, function() {
        i(/* @__PURE__ */ new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'));
      });
    });
  }
  loadBufferView(e) {
    const t = this.json.bufferViews[e];
    return this.getDependency("buffer", t.buffer).then(function(o) {
      const s = t.byteLength || 0, n = t.byteOffset || 0;
      return o.slice(n, n + s);
    });
  }
  loadAccessor(e) {
    const t = this, o = this.json, s = this.json.accessors[e];
    if (s.bufferView === void 0 && s.sparse === void 0) {
      const i = we[s.type], a = oe[s.componentType], r = s.normalized === !0, l = new a(s.count * i);
      return Promise.resolve(new _e(l, i, r));
    }
    const n = [];
    return s.bufferView !== void 0 ? n.push(this.getDependency("bufferView", s.bufferView)) : n.push(null), s.sparse !== void 0 && (n.push(this.getDependency("bufferView", s.sparse.indices.bufferView)), n.push(this.getDependency("bufferView", s.sparse.values.bufferView))), Promise.all(n).then(function(i) {
      const a = i[0], r = we[s.type], l = oe[s.componentType], h = l.BYTES_PER_ELEMENT, c = h * r, d = s.byteOffset || 0, u = s.bufferView !== void 0 ? o.bufferViews[s.bufferView].byteStride : void 0, p = s.normalized === !0;
      let b, y;
      if (u && u !== c) {
        const g = Math.floor(d / u), m = "InterleavedBuffer:" + s.bufferView + ":" + s.componentType + ":" + g + ":" + s.count;
        let _ = t.cache.get(m);
        _ || (b = new l(a, g * u, s.count * u / h), _ = new jt(b, u / h), t.cache.add(m, _)), y = new ss(_, r, d % u / h, p);
      } else
        a === null ? b = new l(s.count * r) : b = new l(a, d, s.count * r), y = new _e(b, r, p);
      if (s.sparse !== void 0) {
        const g = we.SCALAR, m = oe[s.sparse.indices.componentType], _ = s.sparse.indices.byteOffset || 0, f = s.sparse.values.byteOffset || 0, w = new m(i[1], _, s.sparse.count * g), S = new l(i[2], f, s.sparse.count * r);
        a !== null && (y = new _e(y.array.slice(), y.itemSize, y.normalized)), y.normalized = !1;
        for (let L = 0, T = w.length; L < T; L++) {
          const O = w[L];
          if (y.setX(O, S[L * r]), r >= 2 && y.setY(O, S[L * r + 1]), r >= 3 && y.setZ(O, S[L * r + 2]), r >= 4 && y.setW(O, S[L * r + 3]), r >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
        y.normalized = p;
      }
      return y;
    });
  }
  loadTexture(e) {
    const t = this.json, o = this.options, s = t.textures[e].source, n = t.images[s];
    let i = this.textureLoader;
    if (n.uri) {
      const a = o.manager.getHandler(n.uri);
      a !== null && (i = a);
    }
    return this.loadTextureImage(e, s, i);
  }
  loadTextureImage(e, t, o) {
    const s = this, n = this.json, i = n.textures[e], a = n.images[t], r = (a.uri || a.bufferView) + ":" + i.sampler;
    if (this.textureCache[r]) return this.textureCache[r];
    const l = this.loadImageSource(t, o).then(function(h) {
      h.flipY = !1, h.name = i.name || a.name || "", h.name === "" && typeof a.uri == "string" && a.uri.startsWith("data:image/") === !1 && (h.name = a.uri);
      const c = (n.samplers || {})[i.sampler] || {};
      return h.magFilter = qe[c.magFilter] || 1006, h.minFilter = qe[c.minFilter] || 1008, h.wrapS = $e[c.wrapS] || 1e3, h.wrapT = $e[c.wrapT] || 1e3, h.generateMipmaps = !h.isCompressedTexture && h.minFilter !== 1003 && h.minFilter !== 1006, s.associations.set(h, { textures: e }), h;
    }).catch(function() {
      return null;
    });
    return this.textureCache[r] = l, l;
  }
  loadImageSource(e, t) {
    const o = this, s = this.json, n = this.options;
    if (this.sourceCache[e] !== void 0) return this.sourceCache[e].then((c) => c.clone());
    const i = s.images[e], a = self.URL || self.webkitURL;
    let r = i.uri || "", l = !1;
    if (i.bufferView !== void 0) r = o.getDependency("bufferView", i.bufferView).then(function(c) {
      l = !0;
      const d = new Blob([c], { type: i.mimeType });
      return r = a.createObjectURL(d), r;
    });
    else if (i.uri === void 0) throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const h = Promise.resolve(r).then(function(c) {
      return new Promise(function(d, u) {
        let p = d;
        t.isImageBitmapLoader === !0 && (p = function(b) {
          const y = new je(b);
          y.needsUpdate = !0, d(y);
        }), t.load(he.resolveURL(c, n.path), p, void 0, u);
      });
    }).then(function(c) {
      return l === !0 && a.revokeObjectURL(r), X(c, i), c.userData.mimeType = i.mimeType || kn(i.uri), c;
    }).catch(function(c) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", r), c;
    });
    return this.sourceCache[e] = h, h;
  }
  assignTexture(e, t, o, s) {
    const n = this;
    return this.getDependency("texture", o.index).then(function(i) {
      if (!i) return null;
      if (o.texCoord !== void 0 && o.texCoord > 0 && (i = i.clone(), i.channel = o.texCoord), n.extensions[R.KHR_TEXTURE_TRANSFORM]) {
        const a = o.extensions !== void 0 ? o.extensions[R.KHR_TEXTURE_TRANSFORM] : void 0;
        if (a) {
          const r = n.associations.get(i);
          i = n.extensions[R.KHR_TEXTURE_TRANSFORM].extendTexture(i, a), n.associations.set(i, r);
        }
      }
      return s !== void 0 && (i.colorSpace = s), e[t] = i, i;
    });
  }
  assignFinalMaterial(e) {
    const t = e.geometry;
    let o = e.material;
    const s = t.attributes.tangent === void 0, n = t.attributes.color !== void 0, i = t.attributes.normal === void 0;
    if (e.isPoints) {
      const a = "PointsMaterial:" + o.uuid;
      let r = this.cache.get(a);
      r || (r = new gs(), ye.prototype.copy.call(r, o), r.color.copy(o.color), r.map = o.map, r.sizeAttenuation = !1, this.cache.add(a, r)), o = r;
    } else if (e.isLine) {
      const a = "LineBasicMaterial:" + o.uuid;
      let r = this.cache.get(a);
      r || (r = new Dt(), ye.prototype.copy.call(r, o), r.color.copy(o.color), r.map = o.map, this.cache.add(a, r)), o = r;
    }
    if (s || n || i) {
      let a = "ClonedMaterial:" + o.uuid + ":";
      s && (a += "derivative-tangents:"), n && (a += "vertex-colors:"), i && (a += "flat-shading:");
      let r = this.cache.get(a);
      r || (r = o.clone(), n && (r.vertexColors = !0), i && (r.flatShading = !0), s && (r.normalScale && (r.normalScale.y *= -1), r.clearcoatNormalScale && (r.clearcoatNormalScale.y *= -1)), this.cache.add(a, r), this.associations.set(r, this.associations.get(o))), o = r;
    }
    e.material = o;
  }
  getMaterialType() {
    return Pe;
  }
  loadMaterial(e) {
    const t = this, o = this.json, s = this.extensions, n = o.materials[e];
    let i;
    const a = {}, r = n.extensions || {}, l = [];
    if (r[R.KHR_MATERIALS_UNLIT]) {
      const c = s[R.KHR_MATERIALS_UNLIT];
      i = c.getMaterialType(), l.push(c.extendParams(a, n, t));
    } else {
      const c = n.pbrMetallicRoughness || {};
      if (a.color = new W(1, 1, 1), a.opacity = 1, Array.isArray(c.baseColorFactor)) {
        const d = c.baseColorFactor;
        a.color.setRGB(d[0], d[1], d[2], Q), a.opacity = d[3];
      }
      c.baseColorTexture !== void 0 && l.push(t.assignTexture(a, "map", c.baseColorTexture, ne)), a.metalness = c.metallicFactor !== void 0 ? c.metallicFactor : 1, a.roughness = c.roughnessFactor !== void 0 ? c.roughnessFactor : 1, c.metallicRoughnessTexture !== void 0 && (l.push(t.assignTexture(a, "metalnessMap", c.metallicRoughnessTexture)), l.push(t.assignTexture(a, "roughnessMap", c.metallicRoughnessTexture))), i = this._invokeOne(function(d) {
        return d.getMaterialType && d.getMaterialType(e);
      }), l.push(Promise.all(this._invokeAll(function(d) {
        return d.extendMaterialParams && d.extendMaterialParams(e, a);
      })));
    }
    n.doubleSided === !0 && (a.side = 2);
    const h = n.alphaMode || xe.OPAQUE;
    if (h === xe.BLEND ? (a.transparent = !0, a.depthWrite = !1) : (a.transparent = !1, h === xe.MASK && (a.alphaTest = n.alphaCutoff !== void 0 ? n.alphaCutoff : 0.5)), n.normalTexture !== void 0 && i !== ce && (l.push(t.assignTexture(a, "normalMap", n.normalTexture)), a.normalScale = new k(1, 1), n.normalTexture.scale !== void 0)) {
      const c = n.normalTexture.scale;
      a.normalScale.set(c, c);
    }
    if (n.occlusionTexture !== void 0 && i !== ce && (l.push(t.assignTexture(a, "aoMap", n.occlusionTexture)), n.occlusionTexture.strength !== void 0 && (a.aoMapIntensity = n.occlusionTexture.strength)), n.emissiveFactor !== void 0 && i !== ce) {
      const c = n.emissiveFactor;
      a.emissive = new W().setRGB(c[0], c[1], c[2], Q);
    }
    return n.emissiveTexture !== void 0 && i !== ce && l.push(t.assignTexture(a, "emissiveMap", n.emissiveTexture, ne)), Promise.all(l).then(function() {
      const c = new i(a);
      return n.name && (c.name = n.name), X(c, n), t.associations.set(c, { materials: e }), n.extensions && ee(s, c, n), c;
    });
  }
  createUniqueName(e) {
    const t = qt.sanitizeNodeName(e || "");
    return t in this.nodeNamesUsed ? t + "_" + ++this.nodeNamesUsed[t] : (this.nodeNamesUsed[t] = 0, t);
  }
  loadGeometries(e) {
    const t = this, o = this.extensions, s = this.primitiveCache;
    function n(a) {
      return o[R.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a, t).then(function(r) {
        return Qe(r, a, t);
      });
    }
    const i = [];
    for (let a = 0, r = e.length; a < r; a++) {
      const l = e[a], h = Nn(l), c = s[h];
      if (c) i.push(c.promise);
      else {
        let d;
        l.extensions && l.extensions[R.KHR_DRACO_MESH_COMPRESSION] ? d = n(l) : d = Qe(new Oe(), l, t), s[h] = {
          primitive: l,
          promise: d
        }, i.push(d);
      }
    }
    return Promise.all(i);
  }
  loadMesh(e) {
    const t = this, o = this.json, s = this.extensions, n = o.meshes[e], i = n.primitives, a = [];
    for (let r = 0, l = i.length; r < l; r++) {
      const h = i[r].material === void 0 ? Ln(this.cache) : this.getDependency("material", i[r].material);
      a.push(h);
    }
    return a.push(t.loadGeometries(i)), Promise.all(a).then(function(r) {
      const l = r.slice(0, r.length - 1), h = r[r.length - 1], c = [];
      for (let u = 0, p = h.length; u < p; u++) {
        const b = h[u], y = i[u];
        let g;
        const m = l[u];
        if (y.mode === B.TRIANGLES || y.mode === B.TRIANGLE_STRIP || y.mode === B.TRIANGLE_FAN || y.mode === void 0)
          g = n.isSkinnedMesh === !0 ? new zt(b, m) : new ue(b, m), g.isSkinnedMesh === !0 && g.normalizeSkinWeights(), y.mode === B.TRIANGLE_STRIP ? g.geometry = ze(g.geometry, 1) : y.mode === B.TRIANGLE_FAN && (g.geometry = ze(g.geometry, 2));
        else if (y.mode === B.LINES) g = new Ht(b, m);
        else if (y.mode === B.LINE_STRIP) g = new nt(b, m);
        else if (y.mode === B.LINE_LOOP) g = new It(b, m);
        else if (y.mode === B.POINTS) g = new os(b, m);
        else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + y.mode);
        Object.keys(g.geometry.morphAttributes).length > 0 && On(g, n), g.name = t.createUniqueName(n.name || "mesh_" + e), X(g, n), y.extensions && ee(s, g, y), t.assignFinalMaterial(g), c.push(g);
      }
      for (let u = 0, p = c.length; u < p; u++) t.associations.set(c[u], {
        meshes: e,
        primitives: u
      });
      if (c.length === 1)
        return n.extensions && ee(s, c[0], n), c[0];
      const d = new le();
      n.extensions && ee(s, d, n), t.associations.set(d, { meshes: e });
      for (let u = 0, p = c.length; u < p; u++) d.add(c[u]);
      return d;
    });
  }
  loadCamera(e) {
    let t;
    const o = this.json.cameras[e], s = o[o.type];
    if (!s) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return o.type === "perspective" ? t = new hs(pe.radToDeg(s.yfov), s.aspectRatio || 1, s.znear || 1, s.zfar || 2e6) : o.type === "orthographic" && (t = new ot(-s.xmag, s.xmag, s.ymag, -s.ymag, s.znear, s.zfar)), o.name && (t.name = this.createUniqueName(o.name)), X(t, o), Promise.resolve(t);
  }
  loadSkin(e) {
    const t = this.json.skins[e], o = [];
    for (let s = 0, n = t.joints.length; s < n; s++) o.push(this._loadNodeShallow(t.joints[s]));
    return t.inverseBindMatrices !== void 0 ? o.push(this.getDependency("accessor", t.inverseBindMatrices)) : o.push(null), Promise.all(o).then(function(s) {
      const n = s.pop(), i = s, a = [], r = [];
      for (let l = 0, h = i.length; l < h; l++) {
        const c = i[l];
        if (c) {
          a.push(c);
          const d = new K();
          n !== null && d.fromArray(n.array, l * 16), r.push(d);
        } else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[l]);
      }
      return new ys(a, r);
    });
  }
  loadAnimation(e) {
    const t = this.json, o = this, s = t.animations[e], n = s.name ? s.name : "animation_" + e, i = [], a = [], r = [], l = [], h = [];
    for (let c = 0, d = s.channels.length; c < d; c++) {
      const u = s.channels[c], p = s.samplers[u.sampler], b = u.target, y = b.node, g = s.parameters !== void 0 ? s.parameters[p.input] : p.input, m = s.parameters !== void 0 ? s.parameters[p.output] : p.output;
      b.node !== void 0 && (i.push(this.getDependency("node", y)), a.push(this.getDependency("accessor", g)), r.push(this.getDependency("accessor", m)), l.push(p), h.push(b));
    }
    return Promise.all([
      Promise.all(i),
      Promise.all(a),
      Promise.all(r),
      Promise.all(l),
      Promise.all(h)
    ]).then(function(c) {
      const d = c[0], u = c[1], p = c[2], b = c[3], y = c[4], g = [];
      for (let _ = 0, f = d.length; _ < f; _++) {
        const w = d[_], S = u[_], L = p[_], T = b[_], O = y[_];
        if (w === void 0) continue;
        w.updateMatrix && w.updateMatrix();
        const E = o._createAnimationTracks(w, S, L, T, O);
        if (E) for (let I = 0; I < E.length; I++) g.push(E[I]);
      }
      const m = new cs(n, void 0, g);
      return X(m, s), m;
    });
  }
  createNodeMesh(e) {
    const t = this.json, o = this, s = t.nodes[e];
    return s.mesh === void 0 ? null : o.getDependency("mesh", s.mesh).then(function(n) {
      const i = o._getNodeRef(o.meshCache, s.mesh, n);
      return s.weights !== void 0 && i.traverse(function(a) {
        if (a.isMesh)
          for (let r = 0, l = s.weights.length; r < l; r++) a.morphTargetInfluences[r] = s.weights[r];
      }), i;
    });
  }
  loadNode(e) {
    const t = this.json, o = this, s = t.nodes[e], n = o._loadNodeShallow(e), i = [], a = s.children || [];
    for (let l = 0, h = a.length; l < h; l++) i.push(o.getDependency("node", a[l]));
    const r = s.skin === void 0 ? Promise.resolve(null) : o.getDependency("skin", s.skin);
    return Promise.all([
      n,
      Promise.all(i),
      r
    ]).then(function(l) {
      const h = l[0], c = l[1], d = l[2];
      d !== null && h.traverse(function(u) {
        u.isSkinnedMesh && u.bind(d, Dn);
      });
      for (let u = 0, p = c.length; u < p; u++) h.add(c[u]);
      return h;
    });
  }
  _loadNodeShallow(e) {
    const t = this.json, o = this.extensions, s = this;
    if (this.nodeCache[e] !== void 0) return this.nodeCache[e];
    const n = t.nodes[e], i = n.name ? s.createUniqueName(n.name) : "", a = [], r = s._invokeOne(function(l) {
      return l.createNodeMesh && l.createNodeMesh(e);
    });
    return r && a.push(r), n.camera !== void 0 && a.push(s.getDependency("camera", n.camera).then(function(l) {
      return s._getNodeRef(s.cameraCache, n.camera, l);
    })), s._invokeAll(function(l) {
      return l.createNodeAttachment && l.createNodeAttachment(e);
    }).forEach(function(l) {
      a.push(l);
    }), this.nodeCache[e] = Promise.all(a).then(function(l) {
      let h;
      if (n.isBone === !0 ? h = new us() : l.length > 1 ? h = new le() : l.length === 1 ? h = l[0] : h = new rt(), h !== l[0]) for (let c = 0, d = l.length; c < d; c++) h.add(l[c]);
      if (n.name && (h.userData.name = n.name, h.name = i), X(h, n), n.extensions && ee(o, h, n), n.matrix !== void 0) {
        const c = new K();
        c.fromArray(n.matrix), h.applyMatrix4(c);
      } else
        n.translation !== void 0 && h.position.fromArray(n.translation), n.rotation !== void 0 && h.quaternion.fromArray(n.rotation), n.scale !== void 0 && h.scale.fromArray(n.scale);
      if (!s.associations.has(h)) s.associations.set(h, {});
      else if (n.mesh !== void 0 && s.meshCache.refs[n.mesh] > 1) {
        const c = s.associations.get(h);
        s.associations.set(h, { ...c });
      }
      return s.associations.get(h).nodes = e, h;
    }), this.nodeCache[e];
  }
  loadScene(e) {
    const t = this.extensions, o = this.json.scenes[e], s = this, n = new le();
    o.name && (n.name = s.createUniqueName(o.name)), X(n, o), o.extensions && ee(t, n, o);
    const i = o.nodes || [], a = [];
    for (let r = 0, l = i.length; r < l; r++) a.push(s.getDependency("node", i[r]));
    return Promise.all(a).then(function(r) {
      for (let h = 0, c = r.length; h < c; h++) n.add(r[h]);
      const l = (h) => {
        const c = /* @__PURE__ */ new Map();
        for (const [d, u] of s.associations) (d instanceof ye || d instanceof je) && c.set(d, u);
        return h.traverse((d) => {
          const u = s.associations.get(d);
          u != null && c.set(d, u);
        }), c;
      };
      return s.associations = l(n), n;
    });
  }
  _createAnimationTracks(e, t, o, s, n) {
    const i = [], a = e.name ? e.name : e.uuid, r = [];
    q[n.path] === q.weights ? e.traverse(function(d) {
      d.morphTargetInfluences && r.push(d.name ? d.name : d.uuid);
    }) : r.push(a);
    let l;
    switch (q[n.path]) {
      case q.weights:
        l = Ge;
        break;
      case q.rotation:
        l = He;
        break;
      case q.translation:
      case q.scale:
        l = Fe;
        break;
      default:
        o.itemSize === 1 ? l = Ge : l = Fe;
        break;
    }
    const h = s.interpolation !== void 0 ? An[s.interpolation] : st, c = this._getArrayFromAccessor(o);
    for (let d = 0, u = r.length; d < u; d++) {
      const p = new l(r[d] + "." + q[n.path], t.array, c, h);
      s.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(p), i.push(p);
    }
    return i;
  }
  _getArrayFromAccessor(e) {
    let t = e.array;
    if (e.normalized) {
      const o = Le(t.constructor), s = new Float32Array(t.length);
      for (let n = 0, i = t.length; n < i; n++) s[n] = t[n] * o;
      t = s;
    }
    return t;
  }
  _createCubicSplineTrackInterpolant(e) {
    e.createInterpolant = function(o) {
      return new (this instanceof He ? vn : gt)(this.times, this.values, this.getValueSize() / 3, o);
    }, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
};
function In(e, t, o) {
  const s = t.attributes, n = new te();
  if (s.POSITION !== void 0) {
    const r = o.json.accessors[s.POSITION], l = r.min, h = r.max;
    if (l !== void 0 && h !== void 0) {
      if (n.set(new A(l[0], l[1], l[2]), new A(h[0], h[1], h[2])), r.normalized) {
        const c = Le(oe[r.componentType]);
        n.min.multiplyScalar(c), n.max.multiplyScalar(c);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else return;
  const i = t.targets;
  if (i !== void 0) {
    const r = new A(), l = new A();
    for (let h = 0, c = i.length; h < c; h++) {
      const d = i[h];
      if (d.POSITION !== void 0) {
        const u = o.json.accessors[d.POSITION], p = u.min, b = u.max;
        if (p !== void 0 && b !== void 0) {
          if (l.setX(Math.max(Math.abs(p[0]), Math.abs(b[0]))), l.setY(Math.max(Math.abs(p[1]), Math.abs(b[1]))), l.setZ(Math.max(Math.abs(p[2]), Math.abs(b[2]))), u.normalized) {
            const y = Le(oe[u.componentType]);
            l.multiplyScalar(y);
          }
          r.max(l);
        } else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    n.expandByVector(r);
  }
  e.boundingBox = n;
  const a = new kt();
  n.getCenter(a.center), a.radius = n.min.distanceTo(n.max) / 2, e.boundingSphere = a;
}
function Qe(e, t, o) {
  const s = t.attributes, n = [];
  function i(a, r) {
    return o.getDependency("accessor", a).then(function(l) {
      e.setAttribute(r, l);
    });
  }
  for (const a in s) {
    const r = Ae[a] || a.toLowerCase();
    r in e.attributes || n.push(i(s[a], r));
  }
  if (t.indices !== void 0 && !e.index) {
    const a = o.getDependency("accessor", t.indices).then(function(r) {
      e.setIndex(r);
    });
    n.push(a);
  }
  return Ue.workingColorSpace !== "srgb-linear" && "COLOR_0" in s && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ue.workingColorSpace}" not supported.`), X(e, t), In(e, t, o), Promise.all(n).then(function() {
    return t.targets !== void 0 ? Pn(e, t.targets, o) : e;
  });
}
async function Fn(e) {
  const { scene: t } = await new tn().parseAsync(e, ""), o = new ut(), s = [], n = new te().setFromObject(t).getSize(new A());
  let i = 0;
  return t.traverse((a) => {
    if (!(a instanceof ue)) return;
    o.own(a.geometry);
    const r = Array.isArray(a.material) ? a.material : [a.material];
    r.forEach((h) => o.own(h)), s.push({
      geometry: a.geometry,
      role: r[0].name
    });
    const l = a.geometry.getAttribute("position");
    for (let h = 0; h < l.count; h++) i = Math.max(i, Math.hypot(l.getX(h), l.getZ(h)));
  }), {
    parts: s,
    size: n,
    radius: i,
    dispose: () => {
      o.dispose(), t.clear();
    }
  };
}
function Un(e, t, o) {
  const s = /* @__PURE__ */ new Map();
  let n = !1;
  function i(a) {
    const r = s.get(a);
    s.delete(a), r?.abort.abort(), r?.asset?.dispose();
  }
  return {
    get: (a) => s.get(a)?.asset,
    sync(a) {
      if (n) return;
      const r = new Set(a);
      for (const l of s.keys()) r.has(l) || i(l);
      for (const l of r) {
        if (s.has(l)) continue;
        const h = {
          abort: new AbortController(),
          asset: void 0
        };
        s.set(l, h), e(l, h.abort.signal).then((c) => {
          if (s.get(l) !== h) {
            c.dispose();
            return;
          }
          h.asset = c, t();
        }).catch((c) => {
          s.get(l) === h && o(l, c);
        });
      }
    },
    dispose() {
      n = !0;
      for (const a of s.keys()) i(a);
    }
  };
}
var jn = "" + new URL("map-assets/table-BYH2YAbI.glb", import.meta.url).href, Hn = "" + new URL("map-assets/chairRounded-CAXjIAhg.glb", import.meta.url).href, Gn = "" + new URL("map-assets/bedSingle-DQi3T5hW.glb", import.meta.url).href, Bn = "" + new URL("map-assets/bookcaseOpenLow-D5KCefka.glb", import.meta.url).href, zn = "" + new URL("map-assets/tree_oak-BfHnIhp4.glb", import.meta.url).href, Kn = "" + new URL("map-assets/stone_largeE-BlCexUuF.glb", import.meta.url).href, Vn = "" + new URL("map-assets/stoolBar-K3cU9Dzt.glb", import.meta.url).href, Xn = "" + new URL("map-assets/bench-Bgad_ueP.glb", import.meta.url).href, Yn = "" + new URL("map-assets/loungeSofa-B4ImPSPA.glb", import.meta.url).href, Wn = "" + new URL("map-assets/kitchenCabinet-DDG9MLaC.glb", import.meta.url).href, Zn = "" + new URL("map-assets/chest-5wu5Viff.glb", import.meta.url).href, qn = "" + new URL("map-assets/barrel-CTYVDd_z.glb", import.meta.url).href, $n = "" + new URL("map-assets/kitchenStove-RyR0iXNj.glb", import.meta.url).href, Qn = "" + new URL("map-assets/kitchenFridge-DWiEo7GA.glb", import.meta.url).href, Jn = "" + new URL("map-assets/kitchenSink-BX1FOFLO.glb", import.meta.url).href, ei = "" + new URL("map-assets/toilet-Lah8VaC1.glb", import.meta.url).href, ti = "" + new URL("map-assets/bathtub-CbRYKtGX.glb", import.meta.url).href, si = "" + new URL("map-assets/sedan-CvNIPylJ.glb", import.meta.url).href, ni = "" + new URL("map-assets/statue_ring-MbjedqWU.glb", import.meta.url).href, ii = "" + new URL("map-assets/tent-canvas-DmLjTNyB.glb", import.meta.url).href, oi = "" + new URL("map-assets/pottedPlant-B8kIu3Qg.glb", import.meta.url).href, ai = "" + new URL("map-assets/lampRoundFloor-DO1FJkPg.glb", import.meta.url).href, ri = {
  table: jn,
  chair: Hn,
  bed: Gn,
  shelf: Bn,
  tree: zn,
  rock: Kn,
  stool: Vn,
  bench: Xn,
  sofa: Yn,
  cabinet: Wn,
  chest: Zn,
  barrel: qn,
  stove: $n,
  refrigerator: Qn,
  sink: Jn,
  toilet: ei,
  bathtub: ti,
  car: si,
  statue: ni,
  tent: ii,
  "potted-plant": oi,
  light: ai
};
function ci(e) {
  const t = Se(), o = new Ot(t.sky.color, t.ground, t.sky.intensity), s = new ve(t.key.color, t.key.intensity), n = new ve(t.fill.color, t.fill.intensity), i = [];
  s.shadow.mapSize.set(1024, 1024), s.shadow.normalBias = 0.012, s.shadow.bias = -15e-5, s.shadow.radius = 2, e.add(o, s, s.target, n);
  function a() {
    const r = i.pop();
    r.removeFromParent(), r.dispose();
  }
  return {
    update(r, l, h, c) {
      const d = Se(r.lighting);
      o.color.set(d.sky.color), o.groundColor.set(d.ground), o.intensity = d.sky.intensity, s.color.set(d.key.color), s.intensity = d.key.intensity, s.castShadow = d.shadows, n.color.set(d.fill.color), n.intensity = d.fill.intensity;
      const u = h.getCenter(new A()), p = Math.max(1, h.getSize(new A()).length()), b = r.lighting ? new A(...Mt) : new A(-0.5, 1, 0.5);
      s.position.copy(u).add(b.multiplyScalar(p)), s.target.position.copy(u), n.position.copy(u).add(new A(p, p / 2, -p)), s.updateMatrixWorld(!0), s.target.updateMatrixWorld(!0), s.shadow.updateMatrices(s);
      const y = h.clone().applyMatrix4(s.shadow.camera.matrixWorldInverse);
      Object.assign(s.shadow.camera, {
        left: y.min.x - 0.3,
        right: y.max.x + 0.3,
        top: y.max.y + 0.3,
        bottom: y.min.y - 0.3,
        near: Math.max(0.01, -y.max.z - 1),
        far: -y.min.z + 1
      }), s.shadow.camera.updateProjectionMatrix(), s.shadow.needsUpdate = !0;
      const g = vt(r);
      for (; i.length > g.length; ) a();
      g.forEach((m, _) => {
        let f = i[_];
        f || (f = new at(), i.push(f), e.add(f), f.shadow.mapSize.set(512, 512), f.shadow.normalBias = 0.025, f.shadow.bias = -2e-4, f.shadow.radius = 2, f.shadow.autoUpdate = !1);
        const w = m.radius / l.scale, S = m.overhead ? Math.max(2.2, w * 0.44) : Math.max(1, c.get(m.id)?.y || 0);
        f.color.set(m.color), f.position.copy(l.point(m.x, m.y, S)), f.distance = Math.hypot(w, S), f.decay = 2, f.intensity = S * S * (m.overhead ? 6 : 9), f.castShadow = _ < 1, f.shadow.camera.near = 0.08, f.shadow.camera.far = f.distance, f.shadow.camera.updateProjectionMatrix(), f.shadow.needsUpdate = !0;
      });
    },
    invalidateShadows() {
      for (const r of i) r.shadow.needsUpdate = !0;
    },
    dispose() {
      for (; i.length; ) a();
      s.dispose(), s.removeFromParent(), s.target.removeFromParent(), o.removeFromParent(), n.removeFromParent();
    }
  };
}
function fi(e, t, o) {
  let s, n, i, a, r, l, h, c, d = !1, u = !1, p = !0, b = 0, y = 0, g = 0, m = !0, _ = !1, f = !1, w, S = 14, L = 14;
  const T = new AbortController(), O = new Zt(), E = new ot(-10, 10, 10, -10, 0.01, 1e3), I = new k(), M = ci(O), N = () => !!e.closest(".theme-dark");
  let D = N();
  function F() {
    b && (cancelAnimationFrame(b), b = 0);
  }
  function V() {
    d || (d = !0, F(), T.abort(), l?.disconnect(), h?.disconnect(), c?.disconnect(), n?.dispose(), r?.dispose(), i?.dispose(), a?.dispose(), M.dispose(), s?.dispose(), s?.forceContextLoss(), s?.domElement.remove(), O.clear());
  }
  function Z(v) {
    d || u || (u = !0, F(), o.fallback(v));
  }
  function U() {
    d || u || b || document.hidden || !p || y <= 0 || g <= 0 || (b = requestAnimationFrame(() => {
      b = 0;
      try {
        s.getSize(I), (I.x !== y || I.y !== g) && s.setSize(y, g, !1), s.render(O, E), r?.update(E, y, g, m);
      } catch {
        Z("三维画面暂不可用，已切换二维。");
      }
    }));
  }
  function ke() {
    const [v, x, G, z] = w.viewBox, { frame: H } = i;
    return new te(H.point(v, x), H.point(v + G, x + z)).union(i.bounds);
  }
  function me() {
    if (!n || !i) return;
    const v = ke(), x = v.getCenter(new A()), G = Math.max(1, v.getSize(new A()).length());
    n.target.copy(x), E.position.copy(x).add(new A(9, 13, 15).normalize().multiplyScalar(G * 2)), E.near = G / 1e3, E.far = G * 6, E.lookAt(x), E.updateMatrixWorld(!0);
    let z = 0, H = 0;
    for (const bt of [v.min.x, v.max.x]) for (const yt of [v.min.y, v.max.y]) for (const _t of [v.min.z, v.max.z]) {
      const Ce = new A(bt, yt, _t).applyMatrix4(E.matrixWorldInverse);
      z = Math.max(z, Math.abs(Ce.x)), H = Math.max(H, Math.abs(Ce.y));
    }
    S = z, L = H;
    const J = Math.max(L, S / (y / g || 1)) * 1.09;
    E.top = J, E.bottom = -J, E.left = -J * (y / g || 1), E.right = -E.left, E.zoom = 1, E.updateProjectionMatrix(), n.update(), U();
  }
  function De() {
    if (d) return;
    const v = e.getBoundingClientRect();
    if (y = v.width, g = v.height, y <= 0 || g <= 0) {
      F();
      return;
    }
    E.top = Math.max(L, S / (y / g)) * 1.09, E.bottom = -E.top, E.left = -E.top * y / g, E.right = -E.left, E.updateProjectionMatrix(), U();
  }
  function ge(v) {
    if (!(d || u))
      try {
        const x = w?.key !== v.key;
        x && (i?.dispose(), i = void 0, a?.dispose(), a = Un(async (z, H) => {
          const J = await fetch(ri[z], { signal: H });
          if (!J.ok) throw new Error(`HTTP ${J.status}`);
          return Fn(await J.arrayBuffer());
        }, () => {
          w && ge(w);
        }, (z, H) => console.warn(`[Map 3D] ${z}: keeping procedural shape`, H)));
        const G = Qs(v, D, a, x ? void 0 : i?.frame);
        r?.dispose(), i?.dispose(), w = v, i = G, O.add(i.group), i.updateWalls(_), r = en(t, v, i.anchors), r.symbols(f), M.update(v, i.frame, ke(), i.anchors), x && me(), a?.sync(v.elements.flatMap((z) => {
          const H = ft(z);
          return H ? [H] : [];
        })), U();
      } catch {
        Z("这个场景暂时无法立体显示，已切换二维。");
      }
  }
  function be(v) {
    E.zoom = pe.clamp(E.zoom * v, 0.4, 6), E.updateProjectionMatrix(), U();
  }
  try {
    s = new ps({
      antialias: !0,
      alpha: !0,
      powerPreference: "low-power"
    }), s.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8)), s.setClearColor(0, 0), s.outputColorSpace = ne, s.toneMapping = 7, s.toneMappingExposure = 1.1, s.shadowMap.enabled = !0, s.shadowMap.type = 2, s.debug.onShaderError = () => Z("图形驱动无法绘制三维，已切换二维。");
    const v = s.domElement;
    v.setAttribute("aria-label", "三维场景：左键拖动旋转，Shift + 左键拖动平移，滚轮缩放；单指平移，双指拖动旋转、捏合缩放；方向键旋转，Home 全图"), v.title = "左键拖动旋转 · Shift + 左键拖动平移 · 滚轮缩放", v.setAttribute("role", "group"), v.tabIndex = 0, e.prepend(v), n = new Ts(E, v), n.mouseButtons.RIGHT = null, n.touches = {
      ONE: $.PAN,
      TWO: $.DOLLY_ROTATE
    }, n.enableDamping = !1, n.minPolarAngle = 0.08, n.maxPolarAngle = Math.PI * 0.46, n.minZoom = 0.4, n.maxZoom = 6, n.rotateSpeed = 0.65, n.zoomSpeed = 0.8, n.addEventListener("change", U), v.addEventListener("webglcontextlost", (x) => {
      x.preventDefault(), Z("图形连接已中断，已切换二维。重新打开地图可重试。");
    }, { signal: T.signal }), v.addEventListener("keydown", (x) => {
      if (!(x.ctrlKey || x.metaKey || x.altKey)) {
        if (x.key === "Home") me();
        else if (x.key === "+" || x.key === "=") be(1.2);
        else if (x.key === "-") be(1 / 1.2);
        else if ([
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown"
        ].includes(x.key)) {
          const G = new Re().setFromVector3(E.position.clone().sub(n.target));
          G.theta += x.key === "ArrowLeft" ? -0.13 : x.key === "ArrowRight" ? 0.13 : 0, G.phi = pe.clamp(G.phi + (x.key === "ArrowUp" ? -0.1 : x.key === "ArrowDown" ? 0.1 : 0), n.minPolarAngle, n.maxPolarAngle), E.position.copy(n.target).add(new A().setFromSpherical(G)), n.update(), U();
        } else return;
        x.preventDefault();
      }
    }, { signal: T.signal }), l = new ResizeObserver(() => {
      try {
        De();
      } catch {
        Z("三维画面尺寸调整失败，已切换二维。");
      }
    }), l.observe(e), De(), h = new IntersectionObserver((x) => {
      p = x[0].isIntersecting, p ? U() : F();
    }), h.observe(e), document.addEventListener("visibilitychange", () => {
      document.hidden ? F() : U();
    }, { signal: T.signal }), c = new MutationObserver(() => {
      const x = N();
      x !== D && (D = x, w && ge(w));
    });
    for (let x = e; x; x = x.parentElement) c.observe(x, {
      attributes: !0,
      attributeFilter: ["class"]
    });
    return {
      dispose: V,
      setScene: ge,
      fit: me,
      zoom: be,
      labels(x) {
        m = x, U();
      },
      walls(x) {
        _ = x, i?.updateWalls(x), M.invalidateShadows(), U();
      },
      symbols(x) {
        f = x, r?.symbols(x), U();
      }
    };
  } catch (v) {
    throw V(), v;
  }
}
export {
  fi as createThreeRuntime
};
