/* eslint-disable */
import { a as Mt, c as Rt, d as vt, f as st, h as At, i as Re, l as je, m as Lt, n as Pt, o as ve, p as Ot, r as Nt, s as kt, u as se, y as Ct } from "./xiaobai-os-MapBrowser-CzT6eKeq.js";
import { $ as Dt, A as It, At as q, B as nt, C as Ft, D as ae, Dt as it, E as Ut, Et as jt, F as Ht, Ft as A, G as ie, H as $, I as Gt, It as He, J as V, K as Te, L as Bt, M as ot, Mt as zt, N as Kt, O as Vt, Ot as Ae, P as at, Pt as k, Q as Ne, R as Xt, S as de, St as Yt, T as Wt, Tt as Zt, U as qt, V as $t, W as ue, X as he, Y as me, Z as Y, _ as Qt, _t as rt, a as Jt, at as ct, b as es, bt as ts, ct as lt, d as Ge, dt as ss, et as ns, f as is, ft as ge, g as Le, h as os, ht as as, i as te, it as ht, j as rs, jt as Be, k as cs, kt as ls, l as hs, lt as ds, m as us, mt as fs, n as ps, nt as ms, o as we, ot as gs, p as bs, pt as ze, q as be, r as ys, rt as Ke, s as ke, st as _s, t as Ts, tt as ws, u as W, ut as xs, v as Es, wt as Ss, y as dt, yt as ne, z as ut } from "./xiaobai-os-three.module-CTsY3HDb.js";
import { t as Ve } from "./xiaobai-os-RoundedBoxGeometry-BZgOkuSP.js";
import { n as Xe } from "./xiaobai-os-BufferGeometryUtils-DP7IVjMs.js";
var Ye = { type: "change" }, Ce = { type: "start" }, ft = { type: "end" }, pe = new as(), We = new _s(), Ms = Math.cos(70 * be.DEG2RAD), C = new A(), F = 2 * Math.PI, P = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, xe = 1e-6, Rs = class extends bs {
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
      ONE: q.ROTATE,
      TWO: q.DOLLY_PAN
    }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new A(), this._lastQuaternion = new ge(), this._lastTargetPosition = new A(), this._quat = new ge().setFromUnitVectors(e.up, new A(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new Ae(), this._sphericalDelta = new Ae(), this._scale = 1, this._panOffset = new A(), this._rotateStart = new k(), this._rotateEnd = new k(), this._rotateDelta = new k(), this._panStart = new k(), this._panEnd = new k(), this._panDelta = new k(), this._dollyStart = new k(), this._dollyEnd = new k(), this._dollyDelta = new k(), this._dollyDirection = new A(), this._mouse = new k(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = As.bind(this), this._onPointerDown = vs.bind(this), this._onPointerUp = Ls.bind(this), this._onContextMenu = Is.bind(this), this._onMouseWheel = Ns.bind(this), this._onKeyDown = ks.bind(this), this._onTouchStart = Cs.bind(this), this._onTouchMove = Ds.bind(this), this._onMouseDown = Ps.bind(this), this._onMouseMove = Os.bind(this), this._interceptControlDown = Fs.bind(this), this._interceptControlUp = Us.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
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
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(Ye), this.update(), this.state = P.NONE;
  }
  update(e = null) {
    const t = this.object.position;
    C.copy(t).sub(this.target), C.applyQuaternion(this._quat), this._spherical.setFromVector3(C), this.autoRotate && this.state === P.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let i = this.minAzimuthAngle, s = this.maxAzimuthAngle;
    isFinite(i) && isFinite(s) && (i < -Math.PI ? i += F : i > Math.PI && (i -= F), s < -Math.PI ? s += F : s > Math.PI && (s -= F), i <= s ? this._spherical.theta = Math.max(i, Math.min(s, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (i + s) / 2 ? Math.max(i, this._spherical.theta) : Math.min(s, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let n = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera) this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const o = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), n = o != this._spherical.radius;
    }
    if (C.setFromSpherical(this._spherical), C.applyQuaternion(this._quatInverse), t.copy(this.target).add(C), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let o = null;
      if (this.object.isPerspectiveCamera) {
        const a = C.length();
        o = this._clampDistance(a * this._scale);
        const r = a - o;
        this.object.position.addScaledVector(this._dollyDirection, r), this.object.updateMatrixWorld(), n = !!r;
      } else if (this.object.isOrthographicCamera) {
        const a = new A(this._mouse.x, this._mouse.y, 0);
        a.unproject(this.object);
        const r = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), n = r !== this.object.zoom;
        const l = new A(this._mouse.x, this._mouse.y, 0);
        l.unproject(this.object), this.object.position.sub(l).add(a), this.object.updateMatrixWorld(), o = C.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      o !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position) : (pe.origin.copy(this.object.position), pe.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(pe.direction)) < Ms ? this.object.lookAt(this.target) : (We.setFromNormalAndCoplanarPoint(this.object.up, this.target), pe.intersectPlane(We, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const o = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), o !== this.object.zoom && (this.object.updateProjectionMatrix(), n = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, n || this._lastPosition.distanceToSquared(this.object.position) > xe || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > xe || this._lastTargetPosition.distanceToSquared(this.target) > xe ? (this.dispatchEvent(Ye), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(e) {
    return e !== null ? F / 60 * this.autoRotateSpeed * e : F / 60 / 60 * this.autoRotateSpeed;
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
    const i = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const s = this.object.position;
      C.copy(s).sub(this.target);
      let n = C.length();
      n *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * e * n / i.clientHeight, this.object.matrix), this._panUp(2 * t * n / i.clientHeight, this.object.matrix);
    } else this.object.isOrthographicCamera ? (this._panLeft(e * (this.object.right - this.object.left) / this.object.zoom / i.clientWidth, this.object.matrix), this._panUp(t * (this.object.top - this.object.bottom) / this.object.zoom / i.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = !1);
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
    const i = this.domElement.getBoundingClientRect(), s = e - i.left, n = t - i.top, o = i.width, a = i.height;
    this._mouse.x = s / o * 2 - 1, this._mouse.y = -(n / a) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
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
    this._rotateLeft(F * this._rotateDelta.x / t.clientHeight), this._rotateUp(F * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
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
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(F * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), t = !0;
        break;
      case this.keys.BOTTOM:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(-F * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), t = !0;
        break;
      case this.keys.LEFT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(F * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), t = !0;
        break;
      case this.keys.RIGHT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(-F * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), t = !0;
        break;
    }
    t && (e.preventDefault(), this.update());
  }
  _handleTouchStartRotate(e) {
    if (this._pointers.length === 1) this._rotateStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), i = 0.5 * (e.pageX + t.x), s = 0.5 * (e.pageY + t.y);
      this._rotateStart.set(i, s);
    }
  }
  _handleTouchStartPan(e) {
    if (this._pointers.length === 1) this._panStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), i = 0.5 * (e.pageX + t.x), s = 0.5 * (e.pageY + t.y);
      this._panStart.set(i, s);
    }
  }
  _handleTouchStartDolly(e) {
    const t = this._getSecondPointerPosition(e), i = e.pageX - t.x, s = e.pageY - t.y, n = Math.sqrt(i * i + s * s);
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
      const i = this._getSecondPointerPosition(e), s = 0.5 * (e.pageX + i.x), n = 0.5 * (e.pageY + i.y);
      this._rotateEnd.set(s, n);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(F * this._rotateDelta.x / t.clientHeight), this._rotateUp(F * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(e) {
    if (this._pointers.length === 1) this._panEnd.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), i = 0.5 * (e.pageX + t.x), s = 0.5 * (e.pageY + t.y);
      this._panEnd.set(i, s);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(e) {
    const t = this._getSecondPointerPosition(e), i = e.pageX - t.x, s = e.pageY - t.y, n = Math.sqrt(i * i + s * s);
    this._dollyEnd.set(0, n), this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
    const o = (e.pageX + t.x) * 0.5, a = (e.pageY + t.y) * 0.5;
    this._updateZoomParameters(o, a);
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
    const t = e.deltaMode, i = {
      clientX: e.clientX,
      clientY: e.clientY,
      deltaY: e.deltaY
    };
    switch (t) {
      case 1:
        i.deltaY *= 16;
        break;
      case 2:
        i.deltaY *= 100;
        break;
    }
    return e.ctrlKey && !this._controlActive && (i.deltaY *= 10), i;
  }
};
function vs(e) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(e.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(e) && (this._addPointer(e), e.pointerType === "touch" ? this._onTouchStart(e) : this._onMouseDown(e)));
}
function As(e) {
  this.enabled !== !1 && (e.pointerType === "touch" ? this._onTouchMove(e) : this._onMouseMove(e));
}
function Ls(e) {
  switch (this._removePointer(e), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(e.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(ft), this.state = P.NONE;
      break;
    case 1:
      const t = this._pointers[0], i = this._pointerPositions[t];
      this._onTouchStart({
        pointerId: t,
        pageX: i.x,
        pageY: i.y
      });
      break;
  }
}
function Ps(e) {
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
  this.state !== P.NONE && this.dispatchEvent(Ce);
}
function Os(e) {
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
function Ns(e) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== P.NONE || (e.preventDefault(), this.dispatchEvent(Ce), this._handleMouseWheel(this._customWheelEvent(e)), this.dispatchEvent(ft));
}
function ks(e) {
  this.enabled !== !1 && this._handleKeyDown(e);
}
function Cs(e) {
  switch (this._trackPointer(e), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case q.ROTATE:
          if (this.enableRotate === !1) return;
          this._handleTouchStartRotate(e), this.state = P.TOUCH_ROTATE;
          break;
        case q.PAN:
          if (this.enablePan === !1) return;
          this._handleTouchStartPan(e), this.state = P.TOUCH_PAN;
          break;
        default:
          this.state = P.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case q.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          this._handleTouchStartDollyPan(e), this.state = P.TOUCH_DOLLY_PAN;
          break;
        case q.DOLLY_ROTATE:
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
  this.state !== P.NONE && this.dispatchEvent(Ce);
}
function Ds(e) {
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
function Is(e) {
  this.enabled !== !1 && e.preventDefault();
}
function Fs(e) {
  e.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, {
    passive: !0,
    capture: !0
  }));
}
function Us(e) {
  e.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, {
    passive: !0,
    capture: !0
  }));
}
var Ze = {
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
function js(e) {
  if (se(e) || ["wall", "grid"].includes(e.category) || !e.icon || !Object.hasOwn(Ze, e.icon)) return;
  const t = e.icon;
  return Ze[t].includes(e.shape) ? t : void 0;
}
function Hs(e) {
  const [t, i, s, n] = e.viewBox, o = Math.max(s, n) / 14;
  return {
    scale: o,
    point: (a, r, l = 0) => new A((a - t - s / 2) / o, l, (r - i - n / 2) / o)
  };
}
function Gs(e, t) {
  const i = st(e), s = [i.x + i.width / 2, i.y + i.height / 2], n = Lt(e), o = n.points.map(([a, r]) => new k((a - s[0]) / t, (r - s[1]) / t));
  return n.closed && o.length > 1 && o[0].equals(o[o.length - 1]) && o.pop(), {
    center: s,
    width: i.width / t,
    depth: i.height / t,
    points: o,
    closed: n.closed,
    rotation: -(e.rotation || 0) * Math.PI / 180
  };
}
function Bs(e, t) {
  const i = new Es(new Yt(e.map((s) => new k(s.x, -s.y))), {
    depth: t,
    bevelEnabled: !1,
    steps: 1,
    curveSegments: 1
  });
  return i.rotateX(-Math.PI / 2), i;
}
function zs(e, t, i) {
  const s = e.map((n) => new A(n.x, i, n.y));
  return t && s.length && s.push(s[0].clone()), new ke().setFromPoints(s);
}
function Ks(e, t, i) {
  const s = [];
  for (let o = 0; o < e.length - (t ? 0 : 1); o += 1) {
    const a = e[o], r = e[(o + 1) % e.length], l = r.clone().sub(a);
    if (!l.lengthSq()) continue;
    const h = new k(-l.y, l.x).normalize().multiplyScalar(i / 2), c = [
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
  const n = new ke();
  return n.setAttribute("position", new es(s, 3)), n.computeVertexNormals(), n;
}
function pt(e, t) {
  return e.slice(0, t ? e.length : -1).flatMap((i, s) => {
    const n = e[(s + 1) % e.length], o = i.distanceTo(n);
    return o ? [{
      x: (i.x + n.x) / 2,
      z: (i.y + n.y) / 2,
      length: o,
      rotation: -Math.atan2(n.y - i.y, n.x - i.x)
    }] : [];
  });
}
function Vs(e, t) {
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
  const o = new os(s, 128, 128, fs);
  return o.colorSpace = ne, o.wrapS = o.wrapT = rt, t && e === "wood" && o.repeat.set(0.55, 0.55), o.magFilter = ut, o.minFilter = nt, o.generateMipmaps = !0, o.anisotropy = 4, o.needsUpdate = !0, o;
}
var Xs = {
  ...At,
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
function Ys(e, t, i) {
  const s = Re(i), n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  function r(c, d = 0) {
    const u = c.material || (c.category === "water" ? "water" : "unknown"), m = `${u}:${c.category}:${c.certainty}:${d}`;
    let b = n.get(m);
    if (!b) {
      const _ = {
        danger: "#d77c80",
        magic: "#b29cdb",
        light: "#f4d697",
        actor: "#4598cf",
        marker: "#72b9cb",
        secret: "#8d9ca9"
      }, g = c.category === "terrain", p = u === "wood" && g ? "#c8ab85" : Xs[u], y = new W(!c.material && c.category in _ ? _[c.category] : p);
      y.lerp(new W(d > 0 ? "#ffffff" : "#201c1a"), Math.abs(d));
      const f = ve(c, "").opacity * (u === "glass" ? 0.42 : 1), x = [
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
      x && !a.has(S) && a.set(S, e.own(Vs(u, g)));
      const L = a.get(S) || null;
      b = e.own(new Ne({
        color: y,
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
        ].includes(u) ? y : "#000000",
        emissiveIntensity: u === "warm-light" || u === "cold-light" ? s.lampEmission : 0.18
      })), n.set(m, b);
    }
    return b;
  }
  function l(c) {
    const d = `${c.certainty}:${c.category}`;
    let u = o.get(d);
    if (!u) {
      const m = c.certainty && c.certainty !== "confirmed";
      u = e.own(new Gt({
        color: t ? "#b1bfca" : "#798b91",
        dashSize: c.certainty === "unknown" ? 0.035 : 0.12,
        gapSize: m ? 0.09 : 0,
        transparent: !0,
        opacity: ve(c, "").opacity
      })), o.set(d, u);
    }
    return u;
  }
  function h(c, d = 0) {
    const u = i?.artificial === "on" ? c.material === "cold-light" ? "cold-light" : "warm-light" : "bed-sheet";
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
var mt = class {
  resources = /* @__PURE__ */ new Set();
  own(e) {
    return this.resources.add(e), e;
  }
  dispose() {
    for (const e of this.resources) e.dispose();
    this.resources.clear();
  }
};
function Ws(e, t, i, s) {
  const { cylinder: n, ring: o, cone: a } = s;
  switch (e) {
    case "column": {
      const r = t.shape === "circle" ? n : void 0;
      return i(0, 0.08, 0, 1, 0.16, 1, -0.12, r), i(0, 0.91, 0, 0.68, 1.5, 0.68, 0.02, r), i(0, 1.7, 0, 0.9, 0.12, 0.9, 0.12, r), 1.76;
    }
    case "partition":
      for (const r of [-0.4, 0.4])
        i(r, 0.055, 0, 0.15, 0.11, 1, -0.18), i(r, 0.79, 0, 0.07, 1.5, 0.15, -0.15);
      return i(0, 0.83, 0, 0.78, 1.27, 0.09, 0.08), i(0, 1.5, 0, 0.88, 0.06, 0.15, 0.14), 1.54;
    case "ladder":
      for (const r of [-0.36, 0.36]) i(r, 0.9, 0, 0.09, 1.8, 0.2, -0.1);
      for (let r = 0; r < 6; r++) i(0, 0.18 + r * 0.29, 0, 0.7, 0.055, 0.16, 0.13);
      return 1.8;
    case "well":
      return i(0, 0.21, 0, 0.94, 0.42, 0.94, -0.08, o, t.material || "stone"), i(0, 0.44, 0, 1, 0.08, 1, 0.12, o, t.material || "stone"), 0.48;
    case "fountain":
      return i(0, 0.03, 0, 0.92, 0.06, 0.92, -0.2, n, t.material || "stone"), i(0, 0.13, 0, 1, 0.2, 1, 0.1, o, t.material || "stone"), i(0, 0.38, 0, 0.18, 0.7, 0.18, -0.06, n, t.material || "stone"), i(0, 0.72, 0, 0.48, 0.1, 0.48, 0.12, o, t.material || "stone"), i(0, 0.85, 0, 0.08, 0.17, 0.08, -0.12, n, t.material || "stone"), 0.935;
    case "fire":
      return i(0, 0.055, 0, 0.85, 0.11, 0.17, -0.28, void 0, "wood"), i(0, 0.11, 0, 0.17, 0.11, 0.85, -0.15, void 0, "wood"), i(0, 0.43, 0, 0.6, 0.62, 0.6, 0, a, "warm-light"), i(0.1, 0.31, 0.12, 0.32, 0.4, 0.32, 0.35, a, "warm-light"), 0.74;
    case "flag":
      return i(-0.37, 0.035, 0, 0.25, 0.07, 0.7, -0.22), i(-0.37, 0.8, 0, 0.045, 1.6, 0.08, -0.15), i(0.04, 1.28, 0, 0.77, 0.46, 0.035, 0.1, void 0, t.material || "fabric"), 1.6;
    case "sign":
      for (const r of [-0.3, 0.3])
        i(r, 0.055, 0, 0.18, 0.11, 0.85, -0.22), i(r, 0.62, 0, 0.07, 1.2, 0.16, -0.12);
      return i(0, 0.9, 0, 1, 0.64, 0.18, -0.05), i(0, 0.9, 0.095, 0.9, 0.52, 0.025, 0.22), 1.22;
    case "terminal":
      return i(0, 0.065, 0, 0.72, 0.13, 0.84, -0.25), i(0, 0.54, -0.09, 0.4, 1, 0.44, -0.1), i(0, 1.1, -0.12, 1, 0.7, 0.3, -0.16), i(0, 1.11, 0.04, 0.86, 0.54, 0.025, -0.6), i(0, 0.77, 0.21, 0.88, 0.06, 0.55, 0.12), 1.45;
    case "machine":
      i(0, 0.055, 0, 1, 0.11, 1, -0.25), i(-0.16, 0.39, 0, 0.62, 0.64, 0.82, 0), i(-0.16, 0.79, 0, 0.54, 0.22, 0.72, 0.15), i(0.34, 0.46, 0, 0.26, 0.76, 0.73, -0.14);
      for (const r of [
        -0.34,
        -0.2,
        -0.06,
        0.08
      ]) i(r, 0.5, 0.421, 0.04, 0.3, 0.014, -0.5);
      return 0.9;
    case "vending-machine":
      return i(0, 0.1, 0, 0.94, 0.2, 0.86, -0.25), i(0, 0.92, 0, 1, 1.68, 0.92, -0.02), i(-0.12, 1.11, 0.468, 0.64, 1.05, 0.018, -0.5), i(0.34, 1.05, 0.48, 0.17, 0.38, 0.03, -0.18), i(0, 0.31, 0.468, 0.74, 0.18, 0.018, -0.65), i(0, 1.73, 0, 1, 0.07, 0.98, 0.16), 1.765;
  }
}
function Zs(e, t) {
  const i = e.own(new Ve(1, 1, 1, 3, 0.035)), s = e.own(new Ve(1, 1, 1, 4, 0.16)), n = e.own(i.clone()), o = n.getAttribute("position");
  for (let d = 0; d < o.count; d += 1) {
    const u = 0.72 + 0.28 * (o.getY(d) + 0.5);
    o.setX(d, o.getX(d) * u), o.setZ(d, o.getZ(d) * u);
  }
  n.computeVertexNormals();
  const a = e.own(new us(0.5, 0.5, 1, 32)), r = e.own(new it(0.5, 16, 10)), l = e.own(new Qt(0.5, 0)), h = e.own(new is(0.5, 1, 9)), c = e.own(new Kt([
    [0.35, -0.5],
    [0.5, -0.5],
    [0.5, 0.5],
    [0.35, 0.5],
    [0.35, -0.5]
  ].map(([d, u]) => new k(d, u)), 32));
  return function(u, m, b, _, g) {
    const p = Math.min(1.6, Math.min(_, g)), y = /* @__PURE__ */ new Map();
    function f(T, O, I, D, R, N, E = 0, U = i, z) {
      const re = t.mesh(z ? {
        ...m,
        material: z
      } : m, E), Q = `${U.uuid}:${re.uuid}`;
      y.has(Q) || y.set(Q, {
        geometry: U,
        material: re,
        matrices: []
      }), y.get(Q).matrices.push(new V().makeScale(D * _, R * p, N * g).setPosition(T * _, O * p, I * g));
    }
    function x(T) {
      for (const O of [-0.37, 0.37]) for (const I of [-0.36, 0.36]) f(O, T / 2, I, 0.075, T, 0.075, -0.16, n);
    }
    function S() {
      switch (b) {
        case "table":
          if (m.shape === "circle")
            f(0, 0.6, 0, 1, 0.08, 1, 0.12, a), f(0, 0.29, 0, 0.18, 0.58, 0.18, -0.15, a), f(0, 0.04, 0, 0.43, 0.08, 0.43, -0.22, a);
          else {
            x(0.58);
            for (const T of [-0.36, 0.36]) f(0, 0.52, T, 0.83, 0.13, 0.045, -0.12);
            for (const T of [-0.37, 0.37]) f(T, 0.52, 0, 0.045, 0.13, 0.75, -0.12);
            f(0, 0.607, 0, 0.98, 0.065, 0.98, -0.1), f(0, 0.651, 0, 1, 0.035, 1, 0.12);
          }
          return 0.67 * p;
        case "chair":
          x(0.52), f(0, 0.55, 0.035, 1, 0.08, 0.93, 0.06), f(0, 0.595, 0.05, 0.91, 0.035, 0.83, 0.16);
          for (const T of [-0.42, 0.42]) f(T, 0.82, -0.425, 0.095, 0.73, 0.12, -0.1);
          for (const T of [
            -0.22,
            0,
            0.22
          ]) f(T, 0.9, -0.425, 0.12, 0.42, 0.07, 0.02);
          f(0, 1.14, -0.425, 0.96, 0.1, 0.14, 0.12);
          for (const T of [-0.37, 0.37]) f(T, 0.23, 0, 0.035, 0.045, 0.74, -0.12);
          return 1.19 * p;
        case "bed":
          return x(0.2), f(0, 0.24, 0, 1, 0.18, 1, -0.2), f(0, 0.39, 0.02, 0.96, 0.16, 0.92, 0.55), f(0, 0.5, 0.15, 0.98, 0.06, 0.63, 0.08), f(0, 0.5, -0.29, 0.64, 0.13, 0.22, 0.65), f(0, 0.47, -0.47, 1, 0.7, 0.06, -0.16), 0.82 * p;
        case "counter":
          f(0, 0.08, 0, 0.9, 0.16, 0.86, -0.28), f(0, 0.57, 0, 0.94, 0.9, 0.91, -0.08), f(0, 0.17, 0.46, 0.96, 0.1, 0.06, 0.06), f(0, 0.94, 0.46, 0.96, 0.08, 0.06, 0.08);
          for (const T of [
            -0.32,
            0,
            0.32
          ])
            f(T, 0.55, 0.46, 0.28, 0.66, 0.045, 0.03), f(T, 0.55, 0.487, 0.235, 0.52, 0.02, -0.09);
          return f(0, 1.025, 0, 1, 0.065, 1, -0.18), f(0, 1.065, 0, 1, 0.03, 1, 0.16), 1.08 * p;
        case "shelf":
          f(0, 1.05, -0.47, 1, 2.1, 0.06, -0.2);
          for (const T of [-0.48, 0.48]) f(T, 1.05, 0, 0.04, 2.1, 1, -0.08);
          for (let T = 0; T < 4; T += 1) f(0, 0.04 + T * 0.67, 0, 1, 0.06, 1, 0.12);
          for (const T of [-0.17, 0.17]) f(T, 1.03, 0, 0.025, 1.98, 0.92, -0.04);
          return f(0, 2.06, 0, 1, 0.08, 1, 0.16), 2.1 * p;
        case "sofa":
          x(0.14), f(0, 0.26, 0, 0.96, 0.27, 0.96, -0.18), f(0, 0.65, -0.37, 0.98, 0.76, 0.26, -0.08, s);
          for (const T of [-0.44, 0.44]) f(T, 0.52, 0, 0.12, 0.49, 0.98, 0.02, s);
          for (const T of [
            -0.26,
            0,
            0.26
          ])
            f(T, 0.46, 0.11, 0.245, 0.19, 0.72, 0.12, s), f(T, 0.77, -0.22, 0.245, 0.43, 0.22, 0.08, s);
          return 1.04 * p;
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
          return 0.65 * p;
        case "tree":
          return f(0, 0.44, 0, 0.14, 0.88, 0.14, -0.42, a), f(0, 1.04, 0, 1, 1.2, 1, -0.04, r), f(-0.16, 1.3, -0.06, 0.6, 0.65, 0.6, 0.13, r), 1.65 * p;
        case "rock":
          return f(0, 0.29, 0, 1, 0.62, 1, 0.03, l), 0.6 * p;
        default:
          return Ws(b, m, f, {
            cylinder: a,
            ring: c,
            cone: h
          }) * p;
      }
    }
    const L = S();
    for (const { geometry: T, material: O, matrices: I } of y.values()) {
      const D = e.own(new ae(T, O, I.length));
      I.forEach((R, N) => D.setMatrixAt(N, R)), D.castShadow = O.opacity >= 0.8, D.receiveShadow = !0, u.add(D);
    }
    return L;
  };
}
var qs = /* @__PURE__ */ JSON.parse('[{"icon":"table","file":"table.glb","originalFile":"furniture/Models/GLTF format/table.glb","sourceSha256":"ff1a94498d023957f4bc3ff6f55a7a82977d336dbf01a573b3364f03afe5ff61","sha256":"07cd3bfb1f6884b7476a2e6222f735bbd0e7ff9b29c59f210d9a06fe9f1ba5e8","bytes":12476,"triangles":120,"batches":1,"geometryBytes":11520,"size":[0.8414879441261292,0.3267339766025543,0.44737333059310913],"radius":0.4765094062648687},{"icon":"chair","file":"chairRounded.glb","originalFile":"furniture/Models/GLTF format/chairRounded.glb","sourceSha256":"53f4933ec547179c499f04dbda1231cf44b83ec82c7f4ab981cdf680aee5c973","sha256":"f62c6c7e655f8360971bd859c14c150a1f77355f14b5379b29cdd6d1fb97db4c","bytes":27844,"triangles":280,"batches":1,"geometryBytes":26880,"size":[0.20000000298023224,0.45499998331069946,0.20000000298023224],"radius":0.14142135834465194},{"icon":"bed","file":"bedSingle.glb","originalFile":"furniture/Models/GLTF format/bedSingle.glb","sourceSha256":"ca00c63f9a12da3138d902b2f5f18e0360fb6e8a5ac42ccb4bc3f185724b65d1","sha256":"b89c28f9ad8e77ddbc8fd9bcfb8a8f87157a7c8971dd20ee0718b6f585629c89","bytes":22864,"triangles":214,"batches":3,"geometryBytes":20544,"size":[0.5709999799728394,0.375,1.125],"radius":0.6294541280557842},{"icon":"shelf","file":"bookcaseOpenLow.glb","originalFile":"furniture/Models/GLTF format/bookcaseOpenLow.glb","sourceSha256":"6d4d625faf977a2dbf155f1313cd32c6310e463114a1cd4c08cb9f80a5fb1d75","sha256":"c67a8d18cd802afb82d74a73d0c0dc85a7188facbfb5ede13909b9bc6cc33226","bytes":18596,"triangles":184,"batches":1,"geometryBytes":17664,"size":[0.4000000059604645,0.4000000059604645,0.25],"radius":0.23584953082864699},{"icon":"tree","file":"tree_oak.glb","originalFile":"nature/Models/GLTF format/tree_oak.glb","sourceSha256":"d7fd8773674928c50c11b66d12c636d49bdcc15a8b1c7fbb98e6f63a3439a3f3","sha256":"adb24a59f159f214971fefe7e51539d7a938a8a3908b0d756c25e914d0bce681","bytes":20500,"triangles":196,"batches":2,"geometryBytes":18816,"size":[0.6405540108680725,1.2262399204075336,0.7396479845046997],"radius":0.36982402101696993},{"icon":"rock","file":"stone_largeE.glb","originalFile":"nature/Models/GLTF format/stone_largeE.glb","sourceSha256":"392cf28f85aa4b7b7c5e12b1a3b87fe2b3a7c5ec1797d5d1d0d58edca6da9de8","sha256":"07185b2e5f8ce40fc14e8c29db249fa607da56651abcf22f93f8c02f4d7512af","bytes":7116,"triangles":64,"batches":1,"geometryBytes":6144,"size":[1.095458745956421,0.2922479815781114,0.9198710918426514],"radius":0.5865749968024526},{"icon":"stool","file":"stoolBar.glb","originalFile":"furniture/Models/GLTF format/stoolBar.glb","sourceSha256":"a86167a9f92401a61fec7e509ad089ecc552d0f299743add3aeb919acb24e341","sha256":"6fe6e654458f50ab7e73cc5977f055a50562cb74a56a8bd5ebaac312f03c4563","bytes":17852,"triangles":176,"batches":1,"geometryBytes":16896,"size":[0.2654399871826172,0.4350000023841858,0.2298777848482132],"radius":0.13272000284524055},{"icon":"bench","file":"bench.glb","originalFile":"furniture/Models/GLTF format/bench.glb","sourceSha256":"ba05a6d23a5a5a44da016757632070e47ff7587ce10e2f6d6d52328b4cf5489b","sha256":"21bd02dce1f980aff3bc22c916bdcbefa3db2fa11bd5dbbc9fbb07830f9bd87b","bytes":17280,"triangles":170,"batches":1,"geometryBytes":16320,"size":[0.4000000059604645,0.4699999988079071,0.20000000298023224],"radius":0.22360680108197992},{"icon":"sofa","file":"loungeSofa.glb","originalFile":"furniture/Models/GLTF format/loungeSofa.glb","sourceSha256":"1886b811c0d3ad0d8525a4fd43adf4112c497c8e0ed906f06877ca3517f4c7dd","sha256":"a4a0b16aa48731b61fcc08302c8bca8d2ff9e1ae41e77893ed9f2091f8a35ee2","bytes":13952,"triangles":128,"batches":2,"geometryBytes":12288,"size":[0.9799999594688416,0.46000000834465027,0.4100000262260437],"radius":0.5311543895291386},{"icon":"cabinet","file":"kitchenCabinet.glb","originalFile":"furniture/Models/GLTF format/kitchenCabinet.glb","sourceSha256":"7238c57778935ae25db5e57e9f7af3ba7068c71b005ff7cfbff3b6f3b1a13200","sha256":"0f9b3693f3de853fa68148bb71c9e29ecf38e784bfa7e39a7fb3cc78f76ce972","bytes":12604,"triangles":114,"batches":2,"geometryBytes":10944,"size":[0.4300000071525574,0.44999998807907104,0.44999998807907104],"radius":0.3112073245532484},{"icon":"stove","file":"kitchenStove.glb","originalFile":"furniture/Models/GLTF format/kitchenStove.glb","sourceSha256":"3239edb36295dfca9530a9b9a6ad0aff98ce62e7cf8d13ca2a5a1a6b2a904656","sha256":"6d1deee24fa30890cbfc540fa6e711fce2ab68cc82d0b68e104074c2c161b170","bytes":81356,"triangles":830,"batches":2,"geometryBytes":79680,"size":[0.4300000071525574,0.44999998807907104,0.44999998807907104],"radius":0.3112073245532484},{"icon":"refrigerator","file":"kitchenFridge.glb","originalFile":"furniture/Models/GLTF format/kitchenFridge.glb","sourceSha256":"8af4f4bbb1b5525ad8226e97926a5af60fa8fb20a3cb74dbda5328a9d320dbab","sha256":"69be9a8c3d3a804c494b92220710c61a2f87a4c3600922d0da3d5020eb3aef4c","bytes":25668,"triangles":250,"batches":2,"geometryBytes":24000,"size":[0.4300000071525574,0.9200000166893005,0.29193389415740967],"radius":0.2598679494998898},{"icon":"sink","file":"kitchenSink.glb","originalFile":"furniture/Models/GLTF format/kitchenSink.glb","sourceSha256":"7b9610277d71f00dcf1bba49cf4d98d77ce5177e84bf76c7da2f8893e542f743","sha256":"7063bb1597aae39279a3430952338d6f72fe8bccba5b93b143b930ba992f3878","bytes":32196,"triangles":318,"batches":2,"geometryBytes":30528,"size":[0.4300000071525574,0.4899999797344208,0.44999998807907104],"radius":0.3112073245532484},{"icon":"toilet","file":"toilet.glb","originalFile":"furniture/Models/GLTF format/toilet.glb","sourceSha256":"16165cfd03c56c2cb443b800570810a22ef770f65e7a468f6761d9dc14eaaeae","sha256":"42fcec7b0b225b544dcf05bde35f17e598cdf01c8f5f15f36aa55c76ab91652f","bytes":23732,"triangles":230,"batches":2,"geometryBytes":22080,"size":[0.31255000829696655,0.450965017080307,0.4771767109632492],"radius":0.2827908769988002},{"icon":"bathtub","file":"bathtub.glb","originalFile":"furniture/Models/GLTF format/bathtub.glb","sourceSha256":"54c405c7035aab63dc41e709dc3c50fc5bcfbc4cddc91ffc54188075a6d25d01","sha256":"f15e3a3316060b4ddca2dd1350109adc26bc11f1a4784e8dcb23465ccdb3cb5a","bytes":59480,"triangles":602,"batches":2,"geometryBytes":57792,"size":[0.5600000023841858,0.41999998688697815,1.190000057220459],"radius":0.6478308291120068},{"icon":"potted-plant","file":"pottedPlant.glb","originalFile":"furniture/Models/GLTF format/pottedPlant.glb","sourceSha256":"5b760eda2766f75fda36b2c5df652a1662f82981ef64cd8fa7fe7bcd386b3a15","sha256":"d6be69190662ff9b0388b7332f9a8d8e0530d1373b5a3c08deea336ea09613e7","bytes":7420,"triangles":60,"batches":2,"geometryBytes":5760,"size":[0.21205927431583405,0.6540167927742004,0.24146194756031036],"radius":0.12073097378015518},{"icon":"light","file":"lampRoundFloor.glb","originalFile":"furniture/Models/GLTF format/lampRoundFloor.glb","sourceSha256":"50fe1b5b588edf15bfa9cc880f71a02a4fda6036350b24733d0ef4de5cc5e908","sha256":"f663a0f42fc9277cfc365f4ccc335fe8a80d621159dae74922dd8c3947fd2b36","bytes":8956,"triangles":76,"batches":2,"geometryBytes":7296,"size":[0.15203941613435745,0.8600000143051147,0.17555999755859375],"radius":0.08778000315811903},{"icon":"statue","file":"statue_ring.glb","originalFile":"nature/Models/GLTF format/statue_ring.glb","sourceSha256":"5c62e4165f7a76436faa0b20e98b47d0a9e5021dcbf2a0eef0cdf0912180f02c","sha256":"013b58818fbebae606f6cb9b5bc7f769ac6f55dbf5bc1c486787078a8761d29c","bytes":8976,"triangles":76,"batches":2,"geometryBytes":7296,"size":[0.6000000238418579,0.7964101441204547,0.4000000059604645],"radius":0.3605551391183468},{"icon":"chest","file":"chest.glb","originalFile":"survival/Models/GLB format/chest.glb","sourceSha256":"84b03023e425cc1f96c6d0b0f352608be9e8e01b112790e6b00b8651bf84379b","sha256":"dfaf5cf144a7465e313e87d08eb82b0039202500256a6e89f774d0a1e9c35946","bytes":32580,"triangles":322,"batches":2,"geometryBytes":30912,"size":[0.2603999972343445,0.2571914792060852,0.2720249891281128],"radius":0.18828552338788324},{"icon":"barrel","file":"barrel.glb","originalFile":"survival/Models/GLB format/barrel.glb","sourceSha256":"3a0d12f6bdd1badd361f64ce0fbbf878a4ccfc2de8ff1ac4ed4c1aea2a9ee04a","sha256":"3b1f6cdf0e406cdf9630649a1eca8bdf8428a9f07d794bafd70406e63dafa6e3","bytes":41228,"triangles":412,"batches":2,"geometryBytes":39552,"size":[0.23649999499320984,0.3440000116825104,0.23649999499320984],"radius":0.13364122923364707},{"icon":"tent","file":"tent-canvas.glb","originalFile":"survival/Models/GLB format/tent-canvas.glb","sourceSha256":"efc4bca46a22e4cc4fe391aeafba161c24bc39bfa75e192c57eaacaf686f9717","sha256":"8baaab74d57cfa38d73963dccd6fe711006d28ebef0145a410494625f4cc0b9d","bytes":15868,"triangles":148,"batches":2,"geometryBytes":14208,"size":[0.5607622265815735,0.4913683533668518,0.5610000491142273],"radius":0.37933337775768333},{"icon":"car","file":"sedan.glb","originalFile":"car/Models/GLB format/sedan.glb","sourceSha256":"b532ea7d2c59f7f6b22b138cf1955218a2c1898f1cea932af4d3fd563c3959b7","sha256":"99b2d9141e842d542c406b83a3f8701519cad9f5a4f4d046b7b0d6f8cf12c0f8","bytes":197452,"triangles":2032,"batches":3,"geometryBytes":195072,"size":[1.5,1.2999999523162844,2.549999952316284],"radius":1.3472214803586575}]'), $s = new Map(qs.map((e) => [e.icon, {
  size: new A().fromArray(e.size),
  radius: e.radius
}])), qe = {
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
}, Qs = /* @__PURE__ */ new Set([
  "tree",
  "rock",
  "stool",
  "barrel",
  "potted-plant",
  "light"
]), Js = {
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
function gt(e) {
  if (se(e) || ["wall", "grid"].includes(e.category) || !e.icon || !Object.hasOwn(qe, e.icon)) return;
  const t = e.icon;
  if (e.shape === "circle") return Qs.has(t) ? t : void 0;
  if (e.shape !== "rect") return;
  const { width: i, height: s } = st(e), n = i / s, [o, a] = qe[t];
  return n >= o && n <= a ? t : void 0;
}
function bt(e, t, { size: i, radius: s }, n, o) {
  const a = t === "shelf" ? Math.max(1, Math.ceil(n / o / (i.x / i.z))) : 1, r = Math.min((t === "tree" ? 3 : 2.5) / i.y, e.shape === "circle" ? n / (2 * s) : Math.min(n / a / i.x, o / i.z));
  return {
    count: a,
    scale: r,
    height: i.y * r
  };
}
function en(e, t, i, s) {
  return bt(e, t, $s.get(t), i, s).height;
}
function tn(e, t, i, s, n, o, a, r) {
  const { size: l } = s, { count: h, scale: c, height: d } = bt(t, i, s, n, o), u = t.material ? t : {
    ...t,
    material: Js[i] || "unknown"
  };
  for (const m of s.parts) {
    const b = a.own(m.geometry.clone());
    if (b.scale(c, c, c), i === "table") {
      const x = b.getAttribute("position"), S = l.x * c / 2, L = n / 2 - S;
      for (let T = 0; T < x.count; T++) {
        if (x.getY(T) < l.y * c * 0.55) continue;
        const O = x.getX(T);
        x.setX(T, O + Math.max(-1, Math.min(1, O / (S * 0.5))) * L);
      }
      b.computeVertexNormals();
    }
    b.computeBoundingBox(), b.computeBoundingSphere();
    let _ = u;
    m.role === "soft" || m.role === "shade" ? _ = {
      ...t,
      material: "bed-sheet"
    } : m.role === "foliage" ? _ = {
      ...t,
      material: "forest"
    } : m.role === "window" ? _ = {
      ...t,
      material: "glass"
    } : m.role === "wood" ? _ = {
      ...t,
      material: "wood"
    } : m.role === "bark" && (!t.material || ["grass", "forest"].includes(t.material)) && (_ = {
      ...t,
      material: "wood"
    });
    const g = m.role === "detail" ? i === "car" ? -0.78 : -0.25 : m.role === "bark" ? -0.22 : m.role === "window" ? -0.3 : m.role === "soft" ? 0.12 : 0, p = i === "light" && m.role === "shade" ? r.lampShade(t, g) : r.mesh(_, g), y = a.own(new ae(b, p, h));
    for (let x = 0; x < h; x++) y.setMatrixAt(x, new V().makeTranslation((x - (h - 1) / 2) * l.x * c, 0, 0));
    const f = i === "light" && m.role === "shade" && p.emissiveIntensity > 0 && p.emissive.getHex() !== 0;
    y.castShadow = p.opacity >= 0.8 && !f, y.receiveShadow = !0, e.add(y);
  }
  return d;
}
function sn(e, t, i, s, n, o) {
  const a = pt(t, i), r = [], l = Math.max(0.45, a.reduce((d, u) => d + u.length, 0) / 128);
  let h = 0;
  for (const d of a) {
    for (const u of [0.22, 0.5]) r.push(new V().makeRotationY(d.rotation).scale(new A(d.length, 0.045, 0.04)).setPosition(d.x, u, d.z));
    for (; h <= d.length; ) {
      const u = h - d.length / 2;
      r.push(new V().makeScale(0.065, 0.58, 0.065).setPosition(d.x + Math.cos(d.rotation) * u, 0.29, d.z - Math.sin(d.rotation) * u)), h += l;
    }
    h -= d.length;
  }
  if (!i && t.length) {
    const d = t.at(-1);
    r.push(new V().makeScale(0.065, 0.58, 0.065).setPosition(d.x, 0.29, d.y));
  }
  const c = o.own(new ae(s, n, r.length));
  return r.forEach((d, u) => c.setMatrixAt(u, d)), c.castShadow = n.opacity >= 0.8, c.receiveShadow = !0, e.add(c), 0.58;
}
function nn(e, t) {
  let i = !1;
  for (let s = 0, n = t.length - 1; s < t.length; n = s++) {
    const o = t[s], a = t[n];
    o.y > e.y != a.y > e.y && e.x < (a.x - o.x) * (e.y - o.y) / (a.y - o.y) + o.x && (i = !i);
  }
  return i;
}
function on(e, t, i, s = Hs(e)) {
  const n = new mt(), o = new de();
  try {
    const a = Ys(n, t, e.lighting), r = Zs(n, a), l = n.own(new Jt(1, 1, 1)), h = n.own(new it(0.5, 8, 6)), c = Rt(e.elements), d = /* @__PURE__ */ new Map(), u = [], m = new te();
    for (const [_, g] of kt(e.elements).entries()) {
      const p = Gs(g, s.scale), y = new de();
      let f = 0.015, x = !1;
      const S = js(g), L = gt(g), T = L && i?.get(L), O = g.icon === "fence" && ["path", "curve"].includes(g.shape) && !se(g) && !["wall", "grid"].includes(g.category), I = !S && !se(g) && je(g) && (vt(g) || ["furniture", "decoration"].includes(g.category));
      if (g.shape === "icon" || g.shape === "label") f = 0.08;
      else if (g.category === "wall") {
        f = 1.1;
        const R = pt(p.points, p.closed), N = n.own(new ae(l, a.mesh(g, 0.12), R.length));
        N.castShadow = N.receiveShadow = !0, y.add(N), R.forEach((E, U) => {
          const z = new V().makeRotationY(E.rotation).scale(new A(E.length, f, 0.08)).setPosition(E.x, f / 2, E.z);
          N.setMatrixAt(U, z);
        }), u.push(N);
      } else if (O) f = sn(y, p.points, p.closed, l, a.mesh(g), n);
      else if (L && T) f = tn(y, g, L, T, p.width, p.depth, n, a);
      else if (S) f = r(y, g, S, p.width, p.depth);
      else if (je(g)) {
        f = I ? 0.2 : 0.015;
        const R = new me(n.own(Bs(p.points, f)), a.mesh(g));
        R.castShadow = f > 0.1, R.receiveShadow = !0, y.add(R);
      } else if (g.category === "road" || g.category === "water") {
        const R = new me(n.own(Ks(p.points, p.closed, g.category === "road" ? 0.16 : 0.08).translate(0, f, 0)), a.mesh(g));
        R.receiveShadow = !0, y.add(R);
      }
      if (S || T) {
        const R = new te().setFromObject(y), N = Math.max(p.width, p.depth) * 1e-6;
        x = R.min.x > -p.width / 2 + N || R.max.x < p.width / 2 - N || R.min.z > -p.depth / 2 + N || R.max.z < p.depth / 2 - N;
      }
      if (p.points.length && (x || !S && !T)) {
        const R = new at(n.own(zs(p.points, p.closed, x ? 0.019 : g.category === "wall" ? 0.012 : f + 4e-3)), a.line(g));
        R.computeLineDistances(), y.add(R);
      }
      const D = (c.get(g.id) || []).flatMap((R) => {
        const N = new k((R.x - p.center[0]) / s.scale, (R.y - p.center[1]) / s.scale), E = R.size / s.scale / 2;
        return Array.from({ length: 8 }, (U, z) => new k(N.x + E * Math.cos(z * Math.PI / 4), N.y + E * Math.sin(z * Math.PI / 4))).every((U) => nn(U, p.points)) ? [{
          center: N,
          radius: E
        }] : [];
      });
      if (D.length) {
        const R = new ae(h, a.mesh(g, -0.13), D.length);
        D.forEach(({ center: N, radius: E }, U) => R.setMatrixAt(U, new V().makeScale(E * 2, E * 1.4, E * 2).setPosition(N.x, E * 0.7 + f, N.y))), R.castShadow = R.receiveShadow = !0, n.own(R), y.add(R);
      }
      if (y.position.copy(s.point(...p.center, _ * 2e-3)), y.rotation.y = p.rotation, o.add(y), L) {
        const R = en(g, L, p.width, p.depth) + 0.1;
        y.updateMatrix(), m.union(new te(new A(-p.width / 2, 0, -p.depth / 2), new A(p.width / 2, R, p.depth / 2)).applyMatrix4(y.matrix));
      }
      se(g) ? d.set(g.id, s.point(...p.center, y.position.y + 0.025)) : S || L || I ? d.set(g.id, s.point(...p.center, y.position.y + f + 0.1)) : d.set(g.id, s.point(...Ot(g, 0), y.position.y + (O ? f : 0) + 0.1));
    }
    const b = new te().setFromObject(o).union(m);
    for (const _ of d.values()) b.expandByPoint(_);
    return {
      group: o,
      anchors: d,
      bounds: b,
      frame: s,
      updateWalls(_) {
        for (const g of u) g.scale.y = _ ? 0.2 / 1.1 : 1;
      },
      dispose() {
        o.removeFromParent(), n.dispose(), o.clear();
      }
    };
  } catch (a) {
    throw n.dispose(), o.clear(), a;
  }
}
var $e = (e, t) => e.x < t.x + t.w + 3 && e.x + e.w + 3 > t.x && e.y < t.y + t.h + 3 && e.y + e.h + 3 > t.y;
function an(e, t, i, s = []) {
  const n = /* @__PURE__ */ new Map(), o = [...e].sort((c, d) => c.priority - d.priority || c.id.localeCompare(d.id)), a = [...s], r = o.filter((c) => c.badge).map(({ anchor: c }) => ({
    x: c.x - 3,
    y: c.y - 3,
    w: 6,
    h: 6
  })), l = (c) => c.x >= 3 && c.y >= 3 && c.x + c.w <= t - 3 && c.y + c.h <= i - 3, h = (c) => l(c) && !a.some((d) => $e(c, d)) && !r.some((d) => $e(c, d));
  for (const c of o) {
    const d = { anchor: { ...c.anchor } };
    if (n.set(c.id, d), !c.badge) continue;
    const { w: u, h: m } = c.badge, { x: b, y: _ } = c.anchor, g = [];
    for (const y of [
      9,
      27,
      45
    ]) g.push({
      x: b - u / 2,
      y: _ - m - y,
      w: u,
      h: m
    }, {
      x: b + y,
      y: _ - m / 2,
      w: u,
      h: m
    }, {
      x: b - u - y,
      y: _ - m / 2,
      w: u,
      h: m
    }, {
      x: b - u / 2,
      y: _ + y,
      w: u,
      h: m
    });
    const p = g.map((y) => ({
      x: Math.max(3, Math.min(t - u - 3, y.x)),
      y: Math.max(3, Math.min(i - m - 3, y.y)),
      w: u,
      h: m
    }));
    d.badge = p.find(h) || p[0], a.push(d.badge);
  }
  for (const c of o) {
    if (!c.caption) continue;
    const d = n.get(c.id), { w: u, h: m } = c.caption, b = d.badge || {
      ...c.anchor,
      w: 0,
      h: 0
    };
    d.caption = [
      {
        x: b.x + (b.w - u) / 2,
        y: b.y - m - 5,
        w: u,
        h: m
      },
      {
        x: b.x + b.w + 6,
        y: b.y + (b.h - m) / 2,
        w: u,
        h: m
      },
      {
        x: b.x - u - 6,
        y: b.y + (b.h - m) / 2,
        w: u,
        h: m
      },
      {
        x: b.x + (b.w - u) / 2,
        y: b.y + b.h + 5,
        w: u,
        h: m
      }
    ].find(h), d.caption && a.push(d.caption);
  }
  return n;
}
function rn(e, t, i) {
  const s = t.elements.filter((n) => n.label || se(n)).map((n) => {
    const o = se(n) && n.shape !== "label", a = n.actorKey === "player", r = a ? 0 : n.category === "door" ? 1 : n.category === "actor" ? 2 : o ? 3 : 4, l = n.label || Mt[n.category], h = document.createElement("span");
    h.className = `map-3d-label is-${n.category}${a ? " is-player" : ""}`, h.dataset.element = n.id, h.style.zIndex = String(10 - r), o && (h.setAttribute("role", "img"), h.setAttribute("aria-label", l));
    const c = ve(n, "");
    h.style.opacity = String(c.opacity);
    const d = document.createElement("span");
    d.className = "map-3d-glyph", d.setAttribute("aria-hidden", "true");
    const u = document.createElement("span");
    u.className = "map-3d-anchor", u.setAttribute("aria-hidden", "true");
    const m = document.createElement("span");
    m.className = "map-3d-leader", m.setAttribute("aria-hidden", "true"), o && h.append(m, u, d);
    const b = document.createElement("span");
    return b.textContent = l, b.className = "map-3d-label-text", o && b.setAttribute("aria-hidden", "true"), h.append(b), e.append(h), {
      element: n,
      node: h,
      glyph: d,
      dot: u,
      leader: m,
      caption: b,
      recipe: c,
      hasGlyph: o,
      priority: r,
      anchor: i.get(n.id)
    };
  });
  return {
    symbols(n) {
      for (const o of s)
        o.glyph.textContent = n ? o.recipe.icon : o.recipe.fallback, o.glyph.classList.toggle("has-symbols", n);
    },
    update(n, o, a, r) {
      const l = [];
      for (const { element: u, node: m, caption: b, glyph: _, anchor: g, hasGlyph: p, priority: y } of s) {
        m.style.visibility = "hidden", b.hidden = !r;
        const f = g.clone().project(n), x = (f.x + 1) * o / 2, S = (1 - f.y) * a / 2;
        f.z < -1 || f.z > 1 || x < 0 || x > o || S < 0 || S > a || l.push({
          id: u.id,
          anchor: {
            x,
            y: S
          },
          priority: y,
          badge: p ? {
            w: _.offsetWidth,
            h: _.offsetHeight
          } : void 0,
          caption: r ? {
            w: b.offsetWidth,
            h: b.offsetHeight
          } : void 0
        });
      }
      const h = e.parentElement?.querySelector(".map-viewport-controls")?.getBoundingClientRect(), c = e.getBoundingClientRect(), d = an(l, o, a, h ? [{
        x: h.x - c.x,
        y: h.y - c.y,
        w: h.width,
        h: h.height
      }] : []);
      for (const { element: u, node: m, caption: b, dot: _, leader: g } of s) {
        const p = d.get(u.id), y = p?.badge || p?.caption;
        if (b.style.visibility = p?.caption ? "inherit" : "hidden", !(!p || !y) && (m.style.visibility = "visible", m.style.transform = `translate(${y.x}px, ${y.y}px)`, m.style.width = `${y.w}px`, m.style.height = `${y.h}px`, p.caption && (b.style.left = `${p.caption.x - y.x}px`, b.style.top = `${p.caption.y - y.y}px`), p.badge)) {
          const f = p.anchor.x - y.x, x = p.anchor.y - y.y;
          _.style.transform = `translate(${f}px, ${x}px)`;
          const S = Math.max(0, Math.min(y.w, f)), L = Math.max(0, Math.min(y.h, x));
          g.style.width = `${Math.hypot(S - f, L - x)}px`, g.style.transform = `translate(${f}px, ${x}px) rotate(${Math.atan2(L - x, S - f)}rad)`;
        }
      }
    },
    dispose() {
      for (const { node: n } of s) n.remove();
    }
  };
}
var cn = class extends qt {
  constructor(e) {
    super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(t) {
      return new fn(t);
    }), this.register(function(t) {
      return new pn(t);
    }), this.register(function(t) {
      return new En(t);
    }), this.register(function(t) {
      return new Sn(t);
    }), this.register(function(t) {
      return new Mn(t);
    }), this.register(function(t) {
      return new gn(t);
    }), this.register(function(t) {
      return new bn(t);
    }), this.register(function(t) {
      return new yn(t);
    }), this.register(function(t) {
      return new _n(t);
    }), this.register(function(t) {
      return new un(t);
    }), this.register(function(t) {
      return new Tn(t);
    }), this.register(function(t) {
      return new mn(t);
    }), this.register(function(t) {
      return new xn(t);
    }), this.register(function(t) {
      return new wn(t);
    }), this.register(function(t) {
      return new hn(t);
    }), this.register(function(t) {
      return new Rn(t);
    }), this.register(function(t) {
      return new vn(t);
    });
  }
  load(e, t, i, s) {
    const n = this;
    let o;
    if (this.resourcePath !== "") o = this.resourcePath;
    else if (this.path !== "") {
      const l = ue.extractUrlBase(e);
      o = ue.resolveURL(l, this.path);
    } else o = ue.extractUrlBase(e);
    this.manager.itemStart(e);
    const a = function(l) {
      s ? s(l) : console.error(l), n.manager.itemError(e), n.manager.itemEnd(e);
    }, r = new dt(this.manager);
    r.setPath(this.path), r.setResponseType("arraybuffer"), r.setRequestHeader(this.requestHeader), r.setWithCredentials(this.withCredentials), r.load(e, function(l) {
      try {
        n.parse(l, o, function(h) {
          t(h), n.manager.itemEnd(e);
        }, a);
      } catch (h) {
        a(h);
      }
    }, i, a);
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
  parse(e, t, i, s) {
    let n;
    const o = {}, a = {}, r = new TextDecoder();
    if (typeof e == "string") n = JSON.parse(e);
    else if (e instanceof ArrayBuffer) if (r.decode(new Uint8Array(e, 0, 4)) === yt) {
      try {
        o[v.KHR_BINARY_GLTF] = new An(e);
      } catch (h) {
        s && s(h);
        return;
      }
      n = JSON.parse(o[v.KHR_BINARY_GLTF].content);
    } else n = JSON.parse(r.decode(e));
    else n = e;
    if (n.asset === void 0 || n.asset.version[0] < 2) {
      s && s(/* @__PURE__ */ new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const l = new Gn(n, {
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
      c.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), a[c.name] = c, o[c.name] = !0;
    }
    if (n.extensionsUsed) for (let h = 0; h < n.extensionsUsed.length; ++h) {
      const c = n.extensionsUsed[h], d = n.extensionsRequired || [];
      switch (c) {
        case v.KHR_MATERIALS_UNLIT:
          o[c] = new dn();
          break;
        case v.KHR_DRACO_MESH_COMPRESSION:
          o[c] = new Ln(n, this.dracoLoader);
          break;
        case v.KHR_TEXTURE_TRANSFORM:
          o[c] = new Pn();
          break;
        case v.KHR_MESH_QUANTIZATION:
          o[c] = new On();
          break;
        default:
          d.indexOf(c) >= 0 && a[c] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + c + '".');
      }
    }
    l.setExtensions(o), l.setPlugins(a), l.parse(i, s);
  }
  parseAsync(e, t) {
    const i = this;
    return new Promise(function(s, n) {
      i.parse(e, t, s, n);
    });
  }
};
function ln() {
  let e = {};
  return {
    get: function(t) {
      return e[t];
    },
    add: function(t, i) {
      e[t] = i;
    },
    remove: function(t) {
      delete e[t];
    },
    removeAll: function() {
      e = {};
    }
  };
}
var v = {
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
}, hn = class {
  constructor(e) {
    this.parser = e, this.name = v.KHR_LIGHTS_PUNCTUAL, this.cache = {
      refs: {},
      uses: {}
    };
  }
  _markDefs() {
    const e = this.parser, t = this.parser.json.nodes || [];
    for (let i = 0, s = t.length; i < s; i++) {
      const n = t[i];
      n.extensions && n.extensions[this.name] && n.extensions[this.name].light !== void 0 && e._addNodeRef(this.cache, n.extensions[this.name].light);
    }
  }
  _loadLight(e) {
    const t = this.parser, i = "light:" + e;
    let s = t.cache.get(i);
    if (s) return s;
    const n = t.json, o = ((n.extensions && n.extensions[this.name] || {}).lights || [])[e];
    let a;
    const r = new W(16777215);
    o.color !== void 0 && r.setRGB(o.color[0], o.color[1], o.color[2], $);
    const l = o.range !== void 0 ? o.range : 0;
    switch (o.type) {
      case "directional":
        a = new Le(r), a.target.position.set(0, 0, -1), a.add(a.target);
        break;
      case "point":
        a = new lt(r), a.distance = l;
        break;
      case "spot":
        a = new ls(r), a.distance = l, o.spot = o.spot || {}, o.spot.innerConeAngle = o.spot.innerConeAngle !== void 0 ? o.spot.innerConeAngle : 0, o.spot.outerConeAngle = o.spot.outerConeAngle !== void 0 ? o.spot.outerConeAngle : Math.PI / 4, a.angle = o.spot.outerConeAngle, a.penumbra = 1 - o.spot.innerConeAngle / o.spot.outerConeAngle, a.target.position.set(0, 0, -1), a.add(a.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + o.type);
    }
    return a.position.set(0, 0, 0), X(a, o), o.intensity !== void 0 && (a.intensity = o.intensity), a.name = t.createUniqueName(o.name || "light_" + e), s = Promise.resolve(a), t.cache.add(i, s), s;
  }
  getDependency(e, t) {
    if (e === "light")
      return this._loadLight(t);
  }
  createNodeAttachment(e) {
    const t = this, i = this.parser, s = i.json.nodes[e], n = (s.extensions && s.extensions[this.name] || {}).light;
    return n === void 0 ? null : this._loadLight(n).then(function(o) {
      return i._getNodeRef(t.cache, n, o);
    });
  }
}, dn = class {
  constructor() {
    this.name = v.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return he;
  }
  extendParams(e, t, i) {
    const s = [];
    e.color = new W(1, 1, 1), e.opacity = 1;
    const n = t.pbrMetallicRoughness;
    if (n) {
      if (Array.isArray(n.baseColorFactor)) {
        const o = n.baseColorFactor;
        e.color.setRGB(o[0], o[1], o[2], $), e.opacity = o[3];
      }
      n.baseColorTexture !== void 0 && s.push(i.assignTexture(e, "map", n.baseColorTexture, ne));
    }
    return Promise.all(s);
  }
}, un = class {
  constructor(e) {
    this.parser = e, this.name = v.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(e, t) {
    const i = this.parser.json.materials[e];
    if (!i.extensions || !i.extensions[this.name]) return Promise.resolve();
    const s = i.extensions[this.name].emissiveStrength;
    return s !== void 0 && (t.emissiveIntensity = s), Promise.resolve();
  }
}, fn = class {
  constructor(e) {
    this.parser = e, this.name = v.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : Y;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
    const n = [], o = s.extensions[this.name];
    if (o.clearcoatFactor !== void 0 && (t.clearcoat = o.clearcoatFactor), o.clearcoatTexture !== void 0 && n.push(i.assignTexture(t, "clearcoatMap", o.clearcoatTexture)), o.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = o.clearcoatRoughnessFactor), o.clearcoatRoughnessTexture !== void 0 && n.push(i.assignTexture(t, "clearcoatRoughnessMap", o.clearcoatRoughnessTexture)), o.clearcoatNormalTexture !== void 0 && (n.push(i.assignTexture(t, "clearcoatNormalMap", o.clearcoatNormalTexture)), o.clearcoatNormalTexture.scale !== void 0)) {
      const a = o.clearcoatNormalTexture.scale;
      t.clearcoatNormalScale = new k(a, a);
    }
    return Promise.all(n);
  }
}, pn = class {
  constructor(e) {
    this.parser = e, this.name = v.KHR_MATERIALS_DISPERSION;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : Y;
  }
  extendMaterialParams(e, t) {
    const i = this.parser.json.materials[e];
    if (!i.extensions || !i.extensions[this.name]) return Promise.resolve();
    const s = i.extensions[this.name];
    return t.dispersion = s.dispersion !== void 0 ? s.dispersion : 0, Promise.resolve();
  }
}, mn = class {
  constructor(e) {
    this.parser = e, this.name = v.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : Y;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
    const n = [], o = s.extensions[this.name];
    return o.iridescenceFactor !== void 0 && (t.iridescence = o.iridescenceFactor), o.iridescenceTexture !== void 0 && n.push(i.assignTexture(t, "iridescenceMap", o.iridescenceTexture)), o.iridescenceIor !== void 0 && (t.iridescenceIOR = o.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), o.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = o.iridescenceThicknessMinimum), o.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = o.iridescenceThicknessMaximum), o.iridescenceThicknessTexture !== void 0 && n.push(i.assignTexture(t, "iridescenceThicknessMap", o.iridescenceThicknessTexture)), Promise.all(n);
  }
}, gn = class {
  constructor(e) {
    this.parser = e, this.name = v.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : Y;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
    const n = [];
    t.sheenColor = new W(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1;
    const o = s.extensions[this.name];
    if (o.sheenColorFactor !== void 0) {
      const a = o.sheenColorFactor;
      t.sheenColor.setRGB(a[0], a[1], a[2], $);
    }
    return o.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = o.sheenRoughnessFactor), o.sheenColorTexture !== void 0 && n.push(i.assignTexture(t, "sheenColorMap", o.sheenColorTexture, ne)), o.sheenRoughnessTexture !== void 0 && n.push(i.assignTexture(t, "sheenRoughnessMap", o.sheenRoughnessTexture)), Promise.all(n);
  }
}, bn = class {
  constructor(e) {
    this.parser = e, this.name = v.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : Y;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
    const n = [], o = s.extensions[this.name];
    return o.transmissionFactor !== void 0 && (t.transmission = o.transmissionFactor), o.transmissionTexture !== void 0 && n.push(i.assignTexture(t, "transmissionMap", o.transmissionTexture)), Promise.all(n);
  }
}, yn = class {
  constructor(e) {
    this.parser = e, this.name = v.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : Y;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
    const n = [], o = s.extensions[this.name];
    t.thickness = o.thicknessFactor !== void 0 ? o.thicknessFactor : 0, o.thicknessTexture !== void 0 && n.push(i.assignTexture(t, "thicknessMap", o.thicknessTexture)), t.attenuationDistance = o.attenuationDistance || 1 / 0;
    const a = o.attenuationColor || [
      1,
      1,
      1
    ];
    return t.attenuationColor = new W().setRGB(a[0], a[1], a[2], $), Promise.all(n);
  }
}, _n = class {
  constructor(e) {
    this.parser = e, this.name = v.KHR_MATERIALS_IOR;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : Y;
  }
  extendMaterialParams(e, t) {
    const i = this.parser.json.materials[e];
    if (!i.extensions || !i.extensions[this.name]) return Promise.resolve();
    const s = i.extensions[this.name];
    return t.ior = s.ior !== void 0 ? s.ior : 1.5, Promise.resolve();
  }
}, Tn = class {
  constructor(e) {
    this.parser = e, this.name = v.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : Y;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
    const n = [], o = s.extensions[this.name];
    t.specularIntensity = o.specularFactor !== void 0 ? o.specularFactor : 1, o.specularTexture !== void 0 && n.push(i.assignTexture(t, "specularIntensityMap", o.specularTexture));
    const a = o.specularColorFactor || [
      1,
      1,
      1
    ];
    return t.specularColor = new W().setRGB(a[0], a[1], a[2], $), o.specularColorTexture !== void 0 && n.push(i.assignTexture(t, "specularColorMap", o.specularColorTexture, ne)), Promise.all(n);
  }
}, wn = class {
  constructor(e) {
    this.parser = e, this.name = v.EXT_MATERIALS_BUMP;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : Y;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
    const n = [], o = s.extensions[this.name];
    return t.bumpScale = o.bumpFactor !== void 0 ? o.bumpFactor : 1, o.bumpTexture !== void 0 && n.push(i.assignTexture(t, "bumpMap", o.bumpTexture)), Promise.all(n);
  }
}, xn = class {
  constructor(e) {
    this.parser = e, this.name = v.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : Y;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
    const n = [], o = s.extensions[this.name];
    return o.anisotropyStrength !== void 0 && (t.anisotropy = o.anisotropyStrength), o.anisotropyRotation !== void 0 && (t.anisotropyRotation = o.anisotropyRotation), o.anisotropyTexture !== void 0 && n.push(i.assignTexture(t, "anisotropyMap", o.anisotropyTexture)), Promise.all(n);
  }
}, En = class {
  constructor(e) {
    this.parser = e, this.name = v.KHR_TEXTURE_BASISU;
  }
  loadTexture(e) {
    const t = this.parser, i = t.json, s = i.textures[e];
    if (!s.extensions || !s.extensions[this.name]) return null;
    const n = s.extensions[this.name], o = t.options.ktx2Loader;
    if (!o) {
      if (i.extensionsRequired && i.extensionsRequired.indexOf(this.name) >= 0) throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return t.loadTextureImage(e, n.source, o);
  }
}, Sn = class {
  constructor(e) {
    this.parser = e, this.name = v.EXT_TEXTURE_WEBP;
  }
  loadTexture(e) {
    const t = this.name, i = this.parser, s = i.json, n = s.textures[e];
    if (!n.extensions || !n.extensions[t]) return null;
    const o = n.extensions[t], a = s.images[o.source];
    let r = i.textureLoader;
    if (a.uri) {
      const l = i.options.manager.getHandler(a.uri);
      l !== null && (r = l);
    }
    return i.loadTextureImage(e, o.source, r);
  }
}, Mn = class {
  constructor(e) {
    this.parser = e, this.name = v.EXT_TEXTURE_AVIF;
  }
  loadTexture(e) {
    const t = this.name, i = this.parser, s = i.json, n = s.textures[e];
    if (!n.extensions || !n.extensions[t]) return null;
    const o = n.extensions[t], a = s.images[o.source];
    let r = i.textureLoader;
    if (a.uri) {
      const l = i.options.manager.getHandler(a.uri);
      l !== null && (r = l);
    }
    return i.loadTextureImage(e, o.source, r);
  }
}, Rn = class {
  constructor(e) {
    this.name = v.EXT_MESHOPT_COMPRESSION, this.parser = e;
  }
  loadBufferView(e) {
    const t = this.parser.json, i = t.bufferViews[e];
    if (i.extensions && i.extensions[this.name]) {
      const s = i.extensions[this.name], n = this.parser.getDependency("buffer", s.buffer), o = this.parser.options.meshoptDecoder;
      if (!o || !o.supported) {
        if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0) throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return n.then(function(a) {
        const r = s.byteOffset || 0, l = s.byteLength || 0, h = s.count, c = s.byteStride, d = new Uint8Array(a, r, l);
        return o.decodeGltfBufferAsync ? o.decodeGltfBufferAsync(h, c, d, s.mode, s.filter).then(function(u) {
          return u.buffer;
        }) : o.ready.then(function() {
          const u = new ArrayBuffer(h * c);
          return o.decodeGltfBuffer(new Uint8Array(u), h, c, d, s.mode, s.filter), u;
        });
      });
    } else return null;
  }
}, vn = class {
  constructor(e) {
    this.name = v.EXT_MESH_GPU_INSTANCING, this.parser = e;
  }
  createNodeMesh(e) {
    const t = this.parser.json, i = t.nodes[e];
    if (!i.extensions || !i.extensions[this.name] || i.mesh === void 0) return null;
    const s = t.meshes[i.mesh];
    for (const r of s.primitives) if (r.mode !== B.TRIANGLES && r.mode !== B.TRIANGLE_STRIP && r.mode !== B.TRIANGLE_FAN && r.mode !== void 0) return null;
    const n = i.extensions[this.name].attributes, o = [], a = {};
    for (const r in n) o.push(this.parser.getDependency("accessor", n[r]).then((l) => (a[r] = l, a[r])));
    return o.length < 1 ? null : (o.push(this.parser.createNodeMesh(e)), Promise.all(o).then((r) => {
      const l = r.pop(), h = l.isGroup ? l.children : [l], c = r[0].count, d = [];
      for (const u of h) {
        const m = new V(), b = new A(), _ = new ge(), g = new A(1, 1, 1), p = new ae(u.geometry, u.material, c);
        for (let y = 0; y < c; y++)
          a.TRANSLATION && b.fromBufferAttribute(a.TRANSLATION, y), a.ROTATION && _.fromBufferAttribute(a.ROTATION, y), a.SCALE && g.fromBufferAttribute(a.SCALE, y), p.setMatrixAt(y, m.compose(b, _, g));
        for (const y in a) if (y === "_COLOR_0") {
          const f = a[y];
          p.instanceColor = new Ut(f.array, f.itemSize, f.normalized);
        } else y !== "TRANSLATION" && y !== "ROTATION" && y !== "SCALE" && u.geometry.setAttribute(y, a[y]);
        ht.prototype.copy.call(p, u), this.parser.assignFinalMaterial(p), d.push(p);
      }
      return l.isGroup ? (l.clear(), l.add(...d), l) : d[0];
    }));
  }
}, yt = "glTF", le = 12, Qe = {
  JSON: 1313821514,
  BIN: 5130562
}, An = class {
  constructor(e) {
    this.name = v.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const t = new DataView(e, 0, le), i = new TextDecoder();
    if (this.header = {
      magic: i.decode(new Uint8Array(e.slice(0, 4))),
      version: t.getUint32(4, !0),
      length: t.getUint32(8, !0)
    }, this.header.magic !== yt) throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2) throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const s = this.header.length - le, n = new DataView(e, le);
    let o = 0;
    for (; o < s; ) {
      const a = n.getUint32(o, !0);
      o += 4;
      const r = n.getUint32(o, !0);
      if (o += 4, r === Qe.JSON) {
        const l = new Uint8Array(e, le + o, a);
        this.content = i.decode(l);
      } else if (r === Qe.BIN) {
        const l = le + o;
        this.body = e.slice(l, l + a);
      }
      o += a;
    }
    if (this.content === null) throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}, Ln = class {
  constructor(e, t) {
    if (!t) throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = v.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload();
  }
  decodePrimitive(e, t) {
    const i = this.json, s = this.dracoLoader, n = e.extensions[this.name].bufferView, o = e.extensions[this.name].attributes, a = {}, r = {}, l = {};
    for (const h in o) {
      const c = Pe[h] || h.toLowerCase();
      a[c] = o[h];
    }
    for (const h in e.attributes) {
      const c = Pe[h] || h.toLowerCase();
      if (o[h] !== void 0) {
        const d = i.accessors[e.attributes[h]];
        l[c] = oe[d.componentType].name, r[c] = d.normalized === !0;
      }
    }
    return t.getDependency("bufferView", n).then(function(h) {
      return new Promise(function(c, d) {
        s.decodeDracoFile(h, function(u) {
          for (const m in u.attributes) {
            const b = u.attributes[m], _ = r[m];
            _ !== void 0 && (b.normalized = _);
          }
          c(u);
        }, a, l, $, d);
      });
    });
  }
}, Pn = class {
  constructor() {
    this.name = v.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, t) {
    return (t.texCoord === void 0 || t.texCoord === e.channel) && t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 || (e = e.clone(), t.texCoord !== void 0 && (e.channel = t.texCoord), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0), e;
  }
}, On = class {
  constructor() {
    this.name = v.KHR_MESH_QUANTIZATION;
  }
}, _t = class extends It {
  constructor(e, t, i, s) {
    super(e, t, i, s);
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, i = this.sampleValues, s = this.valueSize, n = e * s * 3 + s;
    for (let o = 0; o !== s; o++) t[o] = i[n + o];
    return t;
  }
  interpolate_(e, t, i, s) {
    const n = this.resultBuffer, o = this.sampleValues, a = this.valueSize, r = a * 2, l = a * 3, h = s - t, c = (i - t) / h, d = c * c, u = d * c, m = e * l, b = m - l, _ = -2 * u + 3 * d, g = u - d, p = 1 - _, y = g - d + c;
    for (let f = 0; f !== a; f++) {
      const x = o[b + f + a], S = o[b + f + r] * h, L = o[m + f + a], T = o[m + f] * h;
      n[f] = p * x + y * S + _ * L + g * T;
    }
    return n;
  }
}, Nn = new ge(), kn = class extends _t {
  interpolate_(e, t, i, s) {
    const n = super.interpolate_(e, t, i, s);
    return Nn.fromArray(n).normalize().toArray(n), n;
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
}, Je = {
  9728: ns,
  9729: ut,
  9984: ms,
  9985: $t,
  9986: ws,
  9987: nt
}, et = {
  33071: hs,
  33648: Dt,
  10497: rt
}, Ee = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, Pe = {
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
}, Z = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, Cn = {
  CUBICSPLINE: void 0,
  LINEAR: ot,
  STEP: rs
}, Se = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function Dn(e) {
  return e.DefaultMaterial === void 0 && (e.DefaultMaterial = new Ne({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: 0
  })), e.DefaultMaterial;
}
function ee(e, t, i) {
  for (const s in i.extensions) e[s] === void 0 && (t.userData.gltfExtensions = t.userData.gltfExtensions || {}, t.userData.gltfExtensions[s] = i.extensions[s]);
}
function X(e, t) {
  t.extras !== void 0 && (typeof t.extras == "object" ? Object.assign(e.userData, t.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras));
}
function In(e, t, i) {
  let s = !1, n = !1, o = !1;
  for (let h = 0, c = t.length; h < c; h++) {
    const d = t[h];
    if (d.POSITION !== void 0 && (s = !0), d.NORMAL !== void 0 && (n = !0), d.COLOR_0 !== void 0 && (o = !0), s && n && o) break;
  }
  if (!s && !n && !o) return Promise.resolve(e);
  const a = [], r = [], l = [];
  for (let h = 0, c = t.length; h < c; h++) {
    const d = t[h];
    if (s) {
      const u = d.POSITION !== void 0 ? i.getDependency("accessor", d.POSITION) : e.attributes.position;
      a.push(u);
    }
    if (n) {
      const u = d.NORMAL !== void 0 ? i.getDependency("accessor", d.NORMAL) : e.attributes.normal;
      r.push(u);
    }
    if (o) {
      const u = d.COLOR_0 !== void 0 ? i.getDependency("accessor", d.COLOR_0) : e.attributes.color;
      l.push(u);
    }
  }
  return Promise.all([
    Promise.all(a),
    Promise.all(r),
    Promise.all(l)
  ]).then(function(h) {
    const c = h[0], d = h[1], u = h[2];
    return s && (e.morphAttributes.position = c), n && (e.morphAttributes.normal = d), o && (e.morphAttributes.color = u), e.morphTargetsRelative = !0, e;
  });
}
function Fn(e, t) {
  if (e.updateMorphTargets(), t.weights !== void 0) for (let i = 0, s = t.weights.length; i < s; i++) e.morphTargetInfluences[i] = t.weights[i];
  if (t.extras && Array.isArray(t.extras.targetNames)) {
    const i = t.extras.targetNames;
    if (e.morphTargetInfluences.length === i.length) {
      e.morphTargetDictionary = {};
      for (let s = 0, n = i.length; s < n; s++) e.morphTargetDictionary[i[s]] = s;
    } else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function Un(e) {
  let t;
  const i = e.extensions && e.extensions[v.KHR_DRACO_MESH_COMPRESSION];
  if (i ? t = "draco:" + i.bufferView + ":" + i.indices + ":" + Me(i.attributes) : t = e.indices + ":" + Me(e.attributes) + ":" + e.mode, e.targets !== void 0) for (let s = 0, n = e.targets.length; s < n; s++) t += ":" + Me(e.targets[s]);
  return t;
}
function Me(e) {
  let t = "";
  const i = Object.keys(e).sort();
  for (let s = 0, n = i.length; s < n; s++) t += i[s] + ":" + e[i[s]] + ";";
  return t;
}
function Oe(e) {
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
function jn(e) {
  return e.search(/\.jpe?g($|\?)/i) > 0 || e.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : e.search(/\.webp($|\?)/i) > 0 || e.search(/^data\:image\/webp/) === 0 ? "image/webp" : e.search(/\.ktx2($|\?)/i) > 0 || e.search(/^data\:image\/ktx2/) === 0 ? "image/ktx2" : "image/png";
}
var Hn = new V(), Gn = class {
  constructor(e = {}, t = {}) {
    this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new ln(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = {
      refs: {},
      uses: {}
    }, this.cameraCache = {
      refs: {},
      uses: {}
    }, this.lightCache = {
      refs: {},
      uses: {}
    }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let i = !1, s = -1, n = !1, o = -1;
    if (typeof navigator < "u") {
      const a = navigator.userAgent;
      i = /^((?!chrome|android).)*safari/i.test(a) === !0;
      const r = a.match(/Version\/(\d+)/);
      s = i && r ? parseInt(r[1], 10) : -1, n = a.indexOf("Firefox") > -1, o = n ? a.match(/Firefox\/([0-9]+)\./)[1] : -1;
    }
    typeof createImageBitmap > "u" || i && s < 17 || n && o < 98 ? this.textureLoader = new zt(this.options.manager) : this.textureLoader = new Wt(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new dt(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(e, t) {
    const i = this, s = this.json, n = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(o) {
      return o._markDefs && o._markDefs();
    }), Promise.all(this._invokeAll(function(o) {
      return o.beforeRoot && o.beforeRoot();
    })).then(function() {
      return Promise.all([
        i.getDependencies("scene"),
        i.getDependencies("animation"),
        i.getDependencies("camera")
      ]);
    }).then(function(o) {
      const a = {
        scene: o[0][s.scene || 0],
        scenes: o[0],
        animations: o[1],
        cameras: o[2],
        asset: s.asset,
        parser: i,
        userData: {}
      };
      return ee(n, a, s), X(a, s), Promise.all(i._invokeAll(function(r) {
        return r.afterRoot && r.afterRoot(a);
      })).then(function() {
        for (const r of a.scenes) r.updateMatrixWorld();
        e(a);
      });
    }).catch(t);
  }
  _markDefs() {
    const e = this.json.nodes || [], t = this.json.skins || [], i = this.json.meshes || [];
    for (let s = 0, n = t.length; s < n; s++) {
      const o = t[s].joints;
      for (let a = 0, r = o.length; a < r; a++) e[o[a]].isBone = !0;
    }
    for (let s = 0, n = e.length; s < n; s++) {
      const o = e[s];
      o.mesh !== void 0 && (this._addNodeRef(this.meshCache, o.mesh), o.skin !== void 0 && (i[o.mesh].isSkinnedMesh = !0)), o.camera !== void 0 && this._addNodeRef(this.cameraCache, o.camera);
    }
  }
  _addNodeRef(e, t) {
    t !== void 0 && (e.refs[t] === void 0 && (e.refs[t] = e.uses[t] = 0), e.refs[t]++);
  }
  _getNodeRef(e, t, i) {
    if (e.refs[t] <= 1) return i;
    const s = i.clone(), n = (o, a) => {
      const r = this.associations.get(o);
      r != null && this.associations.set(a, r);
      for (const [l, h] of o.children.entries()) n(h, a.children[l]);
    };
    return n(i, s), s.name += "_instance_" + e.uses[t]++, s;
  }
  _invokeOne(e) {
    const t = Object.values(this.plugins);
    t.push(this);
    for (let i = 0; i < t.length; i++) {
      const s = e(t[i]);
      if (s) return s;
    }
    return null;
  }
  _invokeAll(e) {
    const t = Object.values(this.plugins);
    t.unshift(this);
    const i = [];
    for (let s = 0; s < t.length; s++) {
      const n = e(t[s]);
      n && i.push(n);
    }
    return i;
  }
  getDependency(e, t) {
    const i = e + ":" + t;
    let s = this.cache.get(i);
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
      this.cache.add(i, s);
    }
    return s;
  }
  getDependencies(e) {
    let t = this.cache.get(e);
    if (!t) {
      const i = this, s = this.json[e + (e === "mesh" ? "es" : "s")] || [];
      t = Promise.all(s.map(function(n, o) {
        return i.getDependency(e, o);
      })), this.cache.add(e, t);
    }
    return t;
  }
  loadBuffer(e) {
    const t = this.json.buffers[e], i = this.fileLoader;
    if (t.type && t.type !== "arraybuffer") throw new Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
    if (t.uri === void 0 && e === 0) return Promise.resolve(this.extensions[v.KHR_BINARY_GLTF].body);
    const s = this.options;
    return new Promise(function(n, o) {
      i.load(ue.resolveURL(t.uri, s.path), n, void 0, function() {
        o(/* @__PURE__ */ new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'));
      });
    });
  }
  loadBufferView(e) {
    const t = this.json.bufferViews[e];
    return this.getDependency("buffer", t.buffer).then(function(i) {
      const s = t.byteLength || 0, n = t.byteOffset || 0;
      return i.slice(n, n + s);
    });
  }
  loadAccessor(e) {
    const t = this, i = this.json, s = this.json.accessors[e];
    if (s.bufferView === void 0 && s.sparse === void 0) {
      const o = Ee[s.type], a = oe[s.componentType], r = s.normalized === !0, l = new a(s.count * o);
      return Promise.resolve(new we(l, o, r));
    }
    const n = [];
    return s.bufferView !== void 0 ? n.push(this.getDependency("bufferView", s.bufferView)) : n.push(null), s.sparse !== void 0 && (n.push(this.getDependency("bufferView", s.sparse.indices.bufferView)), n.push(this.getDependency("bufferView", s.sparse.values.bufferView))), Promise.all(n).then(function(o) {
      const a = o[0], r = Ee[s.type], l = oe[s.componentType], h = l.BYTES_PER_ELEMENT, c = h * r, d = s.byteOffset || 0, u = s.bufferView !== void 0 ? i.bufferViews[s.bufferView].byteStride : void 0, m = s.normalized === !0;
      let b, _;
      if (u && u !== c) {
        const g = Math.floor(d / u), p = "InterleavedBuffer:" + s.bufferView + ":" + s.componentType + ":" + g + ":" + s.count;
        let y = t.cache.get(p);
        y || (b = new l(a, g * u, s.count * u / h), y = new Vt(b, u / h), t.cache.add(p, y)), _ = new cs(y, r, d % u / h, m);
      } else
        a === null ? b = new l(s.count * r) : b = new l(a, d, s.count * r), _ = new we(b, r, m);
      if (s.sparse !== void 0) {
        const g = Ee.SCALAR, p = oe[s.sparse.indices.componentType], y = s.sparse.indices.byteOffset || 0, f = s.sparse.values.byteOffset || 0, x = new p(o[1], y, s.sparse.count * g), S = new l(o[2], f, s.sparse.count * r);
        a !== null && (_ = new we(_.array.slice(), _.itemSize, _.normalized)), _.normalized = !1;
        for (let L = 0, T = x.length; L < T; L++) {
          const O = x[L];
          if (_.setX(O, S[L * r]), r >= 2 && _.setY(O, S[L * r + 1]), r >= 3 && _.setZ(O, S[L * r + 2]), r >= 4 && _.setW(O, S[L * r + 3]), r >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
        _.normalized = m;
      }
      return _;
    });
  }
  loadTexture(e) {
    const t = this.json, i = this.options, s = t.textures[e].source, n = t.images[s];
    let o = this.textureLoader;
    if (n.uri) {
      const a = i.manager.getHandler(n.uri);
      a !== null && (o = a);
    }
    return this.loadTextureImage(e, s, o);
  }
  loadTextureImage(e, t, i) {
    const s = this, n = this.json, o = n.textures[e], a = n.images[t], r = (a.uri || a.bufferView) + ":" + o.sampler;
    if (this.textureCache[r]) return this.textureCache[r];
    const l = this.loadImageSource(t, i).then(function(h) {
      h.flipY = !1, h.name = o.name || a.name || "", h.name === "" && typeof a.uri == "string" && a.uri.startsWith("data:image/") === !1 && (h.name = a.uri);
      const c = (n.samplers || {})[o.sampler] || {};
      return h.magFilter = Je[c.magFilter] || 1006, h.minFilter = Je[c.minFilter] || 1008, h.wrapS = et[c.wrapS] || 1e3, h.wrapT = et[c.wrapT] || 1e3, h.generateMipmaps = !h.isCompressedTexture && h.minFilter !== 1003 && h.minFilter !== 1006, s.associations.set(h, { textures: e }), h;
    }).catch(function() {
      return null;
    });
    return this.textureCache[r] = l, l;
  }
  loadImageSource(e, t) {
    const i = this, s = this.json, n = this.options;
    if (this.sourceCache[e] !== void 0) return this.sourceCache[e].then((c) => c.clone());
    const o = s.images[e], a = self.URL || self.webkitURL;
    let r = o.uri || "", l = !1;
    if (o.bufferView !== void 0) r = i.getDependency("bufferView", o.bufferView).then(function(c) {
      l = !0;
      const d = new Blob([c], { type: o.mimeType });
      return r = a.createObjectURL(d), r;
    });
    else if (o.uri === void 0) throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const h = Promise.resolve(r).then(function(c) {
      return new Promise(function(d, u) {
        let m = d;
        t.isImageBitmapLoader === !0 && (m = function(b) {
          const _ = new Be(b);
          _.needsUpdate = !0, d(_);
        }), t.load(ue.resolveURL(c, n.path), m, void 0, u);
      });
    }).then(function(c) {
      return l === !0 && a.revokeObjectURL(r), X(c, o), c.userData.mimeType = o.mimeType || jn(o.uri), c;
    }).catch(function(c) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", r), c;
    });
    return this.sourceCache[e] = h, h;
  }
  assignTexture(e, t, i, s) {
    const n = this;
    return this.getDependency("texture", i.index).then(function(o) {
      if (!o) return null;
      if (i.texCoord !== void 0 && i.texCoord > 0 && (o = o.clone(), o.channel = i.texCoord), n.extensions[v.KHR_TEXTURE_TRANSFORM]) {
        const a = i.extensions !== void 0 ? i.extensions[v.KHR_TEXTURE_TRANSFORM] : void 0;
        if (a) {
          const r = n.associations.get(o);
          o = n.extensions[v.KHR_TEXTURE_TRANSFORM].extendTexture(o, a), n.associations.set(o, r);
        }
      }
      return s !== void 0 && (o.colorSpace = s), e[t] = o, o;
    });
  }
  assignFinalMaterial(e) {
    const t = e.geometry;
    let i = e.material;
    const s = t.attributes.tangent === void 0, n = t.attributes.color !== void 0, o = t.attributes.normal === void 0;
    if (e.isPoints) {
      const a = "PointsMaterial:" + i.uuid;
      let r = this.cache.get(a);
      r || (r = new xs(), Te.prototype.copy.call(r, i), r.color.copy(i.color), r.map = i.map, r.sizeAttenuation = !1, this.cache.add(a, r)), i = r;
    } else if (e.isLine) {
      const a = "LineBasicMaterial:" + i.uuid;
      let r = this.cache.get(a);
      r || (r = new Ht(), Te.prototype.copy.call(r, i), r.color.copy(i.color), r.map = i.map, this.cache.add(a, r)), i = r;
    }
    if (s || n || o) {
      let a = "ClonedMaterial:" + i.uuid + ":";
      s && (a += "derivative-tangents:"), n && (a += "vertex-colors:"), o && (a += "flat-shading:");
      let r = this.cache.get(a);
      r || (r = i.clone(), n && (r.vertexColors = !0), o && (r.flatShading = !0), s && (r.normalScale && (r.normalScale.y *= -1), r.clearcoatNormalScale && (r.clearcoatNormalScale.y *= -1)), this.cache.add(a, r), this.associations.set(r, this.associations.get(i))), i = r;
    }
    e.material = i;
  }
  getMaterialType() {
    return Ne;
  }
  loadMaterial(e) {
    const t = this, i = this.json, s = this.extensions, n = i.materials[e];
    let o;
    const a = {}, r = n.extensions || {}, l = [];
    if (r[v.KHR_MATERIALS_UNLIT]) {
      const c = s[v.KHR_MATERIALS_UNLIT];
      o = c.getMaterialType(), l.push(c.extendParams(a, n, t));
    } else {
      const c = n.pbrMetallicRoughness || {};
      if (a.color = new W(1, 1, 1), a.opacity = 1, Array.isArray(c.baseColorFactor)) {
        const d = c.baseColorFactor;
        a.color.setRGB(d[0], d[1], d[2], $), a.opacity = d[3];
      }
      c.baseColorTexture !== void 0 && l.push(t.assignTexture(a, "map", c.baseColorTexture, ne)), a.metalness = c.metallicFactor !== void 0 ? c.metallicFactor : 1, a.roughness = c.roughnessFactor !== void 0 ? c.roughnessFactor : 1, c.metallicRoughnessTexture !== void 0 && (l.push(t.assignTexture(a, "metalnessMap", c.metallicRoughnessTexture)), l.push(t.assignTexture(a, "roughnessMap", c.metallicRoughnessTexture))), o = this._invokeOne(function(d) {
        return d.getMaterialType && d.getMaterialType(e);
      }), l.push(Promise.all(this._invokeAll(function(d) {
        return d.extendMaterialParams && d.extendMaterialParams(e, a);
      })));
    }
    n.doubleSided === !0 && (a.side = 2);
    const h = n.alphaMode || Se.OPAQUE;
    if (h === Se.BLEND ? (a.transparent = !0, a.depthWrite = !1) : (a.transparent = !1, h === Se.MASK && (a.alphaTest = n.alphaCutoff !== void 0 ? n.alphaCutoff : 0.5)), n.normalTexture !== void 0 && o !== he && (l.push(t.assignTexture(a, "normalMap", n.normalTexture)), a.normalScale = new k(1, 1), n.normalTexture.scale !== void 0)) {
      const c = n.normalTexture.scale;
      a.normalScale.set(c, c);
    }
    if (n.occlusionTexture !== void 0 && o !== he && (l.push(t.assignTexture(a, "aoMap", n.occlusionTexture)), n.occlusionTexture.strength !== void 0 && (a.aoMapIntensity = n.occlusionTexture.strength)), n.emissiveFactor !== void 0 && o !== he) {
      const c = n.emissiveFactor;
      a.emissive = new W().setRGB(c[0], c[1], c[2], $);
    }
    return n.emissiveTexture !== void 0 && o !== he && l.push(t.assignTexture(a, "emissiveMap", n.emissiveTexture, ne)), Promise.all(l).then(function() {
      const c = new o(a);
      return n.name && (c.name = n.name), X(c, n), t.associations.set(c, { materials: e }), n.extensions && ee(s, c, n), c;
    });
  }
  createUniqueName(e) {
    const t = ss.sanitizeNodeName(e || "");
    return t in this.nodeNamesUsed ? t + "_" + ++this.nodeNamesUsed[t] : (this.nodeNamesUsed[t] = 0, t);
  }
  loadGeometries(e) {
    const t = this, i = this.extensions, s = this.primitiveCache;
    function n(a) {
      return i[v.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a, t).then(function(r) {
        return tt(r, a, t);
      });
    }
    const o = [];
    for (let a = 0, r = e.length; a < r; a++) {
      const l = e[a], h = Un(l), c = s[h];
      if (c) o.push(c.promise);
      else {
        let d;
        l.extensions && l.extensions[v.KHR_DRACO_MESH_COMPRESSION] ? d = n(l) : d = tt(new ke(), l, t), s[h] = {
          primitive: l,
          promise: d
        }, o.push(d);
      }
    }
    return Promise.all(o);
  }
  loadMesh(e) {
    const t = this, i = this.json, s = this.extensions, n = i.meshes[e], o = n.primitives, a = [];
    for (let r = 0, l = o.length; r < l; r++) {
      const h = o[r].material === void 0 ? Dn(this.cache) : this.getDependency("material", o[r].material);
      a.push(h);
    }
    return a.push(t.loadGeometries(o)), Promise.all(a).then(function(r) {
      const l = r.slice(0, r.length - 1), h = r[r.length - 1], c = [];
      for (let u = 0, m = h.length; u < m; u++) {
        const b = h[u], _ = o[u];
        let g;
        const p = l[u];
        if (_.mode === B.TRIANGLES || _.mode === B.TRIANGLE_STRIP || _.mode === B.TRIANGLE_FAN || _.mode === void 0)
          g = n.isSkinnedMesh === !0 ? new Zt(b, p) : new me(b, p), g.isSkinnedMesh === !0 && g.normalizeSkinWeights(), _.mode === B.TRIANGLE_STRIP ? g.geometry = Xe(g.geometry, 1) : _.mode === B.TRIANGLE_FAN && (g.geometry = Xe(g.geometry, 2));
        else if (_.mode === B.LINES) g = new Xt(b, p);
        else if (_.mode === B.LINE_STRIP) g = new at(b, p);
        else if (_.mode === B.LINE_LOOP) g = new Bt(b, p);
        else if (_.mode === B.POINTS) g = new ds(b, p);
        else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + _.mode);
        Object.keys(g.geometry.morphAttributes).length > 0 && Fn(g, n), g.name = t.createUniqueName(n.name || "mesh_" + e), X(g, n), _.extensions && ee(s, g, _), t.assignFinalMaterial(g), c.push(g);
      }
      for (let u = 0, m = c.length; u < m; u++) t.associations.set(c[u], {
        meshes: e,
        primitives: u
      });
      if (c.length === 1)
        return n.extensions && ee(s, c[0], n), c[0];
      const d = new de();
      n.extensions && ee(s, d, n), t.associations.set(d, { meshes: e });
      for (let u = 0, m = c.length; u < m; u++) d.add(c[u]);
      return d;
    });
  }
  loadCamera(e) {
    let t;
    const i = this.json.cameras[e], s = i[i.type];
    if (!s) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return i.type === "perspective" ? t = new gs(be.radToDeg(s.yfov), s.aspectRatio || 1, s.znear || 1, s.zfar || 2e6) : i.type === "orthographic" && (t = new ct(-s.xmag, s.xmag, s.ymag, -s.ymag, s.znear, s.zfar)), i.name && (t.name = this.createUniqueName(i.name)), X(t, i), Promise.resolve(t);
  }
  loadSkin(e) {
    const t = this.json.skins[e], i = [];
    for (let s = 0, n = t.joints.length; s < n; s++) i.push(this._loadNodeShallow(t.joints[s]));
    return t.inverseBindMatrices !== void 0 ? i.push(this.getDependency("accessor", t.inverseBindMatrices)) : i.push(null), Promise.all(i).then(function(s) {
      const n = s.pop(), o = s, a = [], r = [];
      for (let l = 0, h = o.length; l < h; l++) {
        const c = o[l];
        if (c) {
          a.push(c);
          const d = new V();
          n !== null && d.fromArray(n.array, l * 16), r.push(d);
        } else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[l]);
      }
      return new Ss(a, r);
    });
  }
  loadAnimation(e) {
    const t = this.json, i = this, s = t.animations[e], n = s.name ? s.name : "animation_" + e, o = [], a = [], r = [], l = [], h = [];
    for (let c = 0, d = s.channels.length; c < d; c++) {
      const u = s.channels[c], m = s.samplers[u.sampler], b = u.target, _ = b.node, g = s.parameters !== void 0 ? s.parameters[m.input] : m.input, p = s.parameters !== void 0 ? s.parameters[m.output] : m.output;
      b.node !== void 0 && (o.push(this.getDependency("node", _)), a.push(this.getDependency("accessor", g)), r.push(this.getDependency("accessor", p)), l.push(m), h.push(b));
    }
    return Promise.all([
      Promise.all(o),
      Promise.all(a),
      Promise.all(r),
      Promise.all(l),
      Promise.all(h)
    ]).then(function(c) {
      const d = c[0], u = c[1], m = c[2], b = c[3], _ = c[4], g = [];
      for (let y = 0, f = d.length; y < f; y++) {
        const x = d[y], S = u[y], L = m[y], T = b[y], O = _[y];
        if (x === void 0) continue;
        x.updateMatrix && x.updateMatrix();
        const I = i._createAnimationTracks(x, S, L, T, O);
        if (I) for (let D = 0; D < I.length; D++) g.push(I[D]);
      }
      const p = new ps(n, void 0, g);
      return X(p, s), p;
    });
  }
  createNodeMesh(e) {
    const t = this.json, i = this, s = t.nodes[e];
    return s.mesh === void 0 ? null : i.getDependency("mesh", s.mesh).then(function(n) {
      const o = i._getNodeRef(i.meshCache, s.mesh, n);
      return s.weights !== void 0 && o.traverse(function(a) {
        if (a.isMesh)
          for (let r = 0, l = s.weights.length; r < l; r++) a.morphTargetInfluences[r] = s.weights[r];
      }), o;
    });
  }
  loadNode(e) {
    const t = this.json, i = this, s = t.nodes[e], n = i._loadNodeShallow(e), o = [], a = s.children || [];
    for (let l = 0, h = a.length; l < h; l++) o.push(i.getDependency("node", a[l]));
    const r = s.skin === void 0 ? Promise.resolve(null) : i.getDependency("skin", s.skin);
    return Promise.all([
      n,
      Promise.all(o),
      r
    ]).then(function(l) {
      const h = l[0], c = l[1], d = l[2];
      d !== null && h.traverse(function(u) {
        u.isSkinnedMesh && u.bind(d, Hn);
      });
      for (let u = 0, m = c.length; u < m; u++) h.add(c[u]);
      return h;
    });
  }
  _loadNodeShallow(e) {
    const t = this.json, i = this.extensions, s = this;
    if (this.nodeCache[e] !== void 0) return this.nodeCache[e];
    const n = t.nodes[e], o = n.name ? s.createUniqueName(n.name) : "", a = [], r = s._invokeOne(function(l) {
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
      if (n.isBone === !0 ? h = new ys() : l.length > 1 ? h = new de() : l.length === 1 ? h = l[0] : h = new ht(), h !== l[0]) for (let c = 0, d = l.length; c < d; c++) h.add(l[c]);
      if (n.name && (h.userData.name = n.name, h.name = o), X(h, n), n.extensions && ee(i, h, n), n.matrix !== void 0) {
        const c = new V();
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
    const t = this.extensions, i = this.json.scenes[e], s = this, n = new de();
    i.name && (n.name = s.createUniqueName(i.name)), X(n, i), i.extensions && ee(t, n, i);
    const o = i.nodes || [], a = [];
    for (let r = 0, l = o.length; r < l; r++) a.push(s.getDependency("node", o[r]));
    return Promise.all(a).then(function(r) {
      for (let h = 0, c = r.length; h < c; h++) n.add(r[h]);
      const l = (h) => {
        const c = /* @__PURE__ */ new Map();
        for (const [d, u] of s.associations) (d instanceof Te || d instanceof Be) && c.set(d, u);
        return h.traverse((d) => {
          const u = s.associations.get(d);
          u != null && c.set(d, u);
        }), c;
      };
      return s.associations = l(n), n;
    });
  }
  _createAnimationTracks(e, t, i, s, n) {
    const o = [], a = e.name ? e.name : e.uuid, r = [];
    Z[n.path] === Z.weights ? e.traverse(function(d) {
      d.morphTargetInfluences && r.push(d.name ? d.name : d.uuid);
    }) : r.push(a);
    let l;
    switch (Z[n.path]) {
      case Z.weights:
        l = Ke;
        break;
      case Z.rotation:
        l = ze;
        break;
      case Z.translation:
      case Z.scale:
        l = He;
        break;
      default:
        i.itemSize === 1 ? l = Ke : l = He;
        break;
    }
    const h = s.interpolation !== void 0 ? Cn[s.interpolation] : ot, c = this._getArrayFromAccessor(i);
    for (let d = 0, u = r.length; d < u; d++) {
      const m = new l(r[d] + "." + Z[n.path], t.array, c, h);
      s.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(m), o.push(m);
    }
    return o;
  }
  _getArrayFromAccessor(e) {
    let t = e.array;
    if (e.normalized) {
      const i = Oe(t.constructor), s = new Float32Array(t.length);
      for (let n = 0, o = t.length; n < o; n++) s[n] = t[n] * i;
      t = s;
    }
    return t;
  }
  _createCubicSplineTrackInterpolant(e) {
    e.createInterpolant = function(i) {
      return new (this instanceof ze ? kn : _t)(this.times, this.values, this.getValueSize() / 3, i);
    }, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
};
function Bn(e, t, i) {
  const s = t.attributes, n = new te();
  if (s.POSITION !== void 0) {
    const r = i.json.accessors[s.POSITION], l = r.min, h = r.max;
    if (l !== void 0 && h !== void 0) {
      if (n.set(new A(l[0], l[1], l[2]), new A(h[0], h[1], h[2])), r.normalized) {
        const c = Oe(oe[r.componentType]);
        n.min.multiplyScalar(c), n.max.multiplyScalar(c);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else return;
  const o = t.targets;
  if (o !== void 0) {
    const r = new A(), l = new A();
    for (let h = 0, c = o.length; h < c; h++) {
      const d = o[h];
      if (d.POSITION !== void 0) {
        const u = i.json.accessors[d.POSITION], m = u.min, b = u.max;
        if (m !== void 0 && b !== void 0) {
          if (l.setX(Math.max(Math.abs(m[0]), Math.abs(b[0]))), l.setY(Math.max(Math.abs(m[1]), Math.abs(b[1]))), l.setZ(Math.max(Math.abs(m[2]), Math.abs(b[2]))), u.normalized) {
            const _ = Oe(oe[u.componentType]);
            l.multiplyScalar(_);
          }
          r.max(l);
        } else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    n.expandByVector(r);
  }
  e.boundingBox = n;
  const a = new jt();
  n.getCenter(a.center), a.radius = n.min.distanceTo(n.max) / 2, e.boundingSphere = a;
}
function tt(e, t, i) {
  const s = t.attributes, n = [];
  function o(a, r) {
    return i.getDependency("accessor", a).then(function(l) {
      e.setAttribute(r, l);
    });
  }
  for (const a in s) {
    const r = Pe[a] || a.toLowerCase();
    r in e.attributes || n.push(o(s[a], r));
  }
  if (t.indices !== void 0 && !e.index) {
    const a = i.getDependency("accessor", t.indices).then(function(r) {
      e.setIndex(r);
    });
    n.push(a);
  }
  return Ge.workingColorSpace !== "srgb-linear" && "COLOR_0" in s && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ge.workingColorSpace}" not supported.`), X(e, t), Bn(e, t, i), Promise.all(n).then(function() {
    return t.targets !== void 0 ? In(e, t.targets, i) : e;
  });
}
async function zn(e) {
  const { scene: t } = await new cn().parseAsync(e, ""), i = new mt(), s = [], n = new te().setFromObject(t).getSize(new A());
  let o = 0;
  return t.traverse((a) => {
    if (!(a instanceof me)) return;
    i.own(a.geometry);
    const r = Array.isArray(a.material) ? a.material : [a.material];
    r.forEach((h) => i.own(h)), s.push({
      geometry: a.geometry,
      role: r[0].name
    });
    const l = a.geometry.getAttribute("position");
    for (let h = 0; h < l.count; h++) o = Math.max(o, Math.hypot(l.getX(h), l.getZ(h)));
  }), {
    parts: s,
    size: n,
    radius: o,
    dispose: () => {
      i.dispose(), t.clear();
    }
  };
}
function Kn(e, t, i) {
  const s = /* @__PURE__ */ new Map();
  let n = !1, o = !1;
  function a() {
    n || !o || [...s.values()].some((l) => !l.settled) || (o = !1, t());
  }
  function r(l) {
    const h = s.get(l);
    s.delete(l), h?.abort.abort(), h?.asset?.dispose();
  }
  return {
    get: (l) => s.get(l)?.asset,
    sync(l) {
      if (n) return;
      const h = new Set(l);
      for (const c of s.keys()) h.has(c) || r(c);
      for (const c of h) {
        if (s.has(c)) continue;
        const d = {
          abort: new AbortController(),
          settled: !1,
          asset: void 0
        };
        s.set(c, d), e(c, d.abort.signal).then((u) => {
          if (s.get(c) !== d) {
            u.dispose();
            return;
          }
          d.asset = u, d.settled = !0, o = !0, a();
        }, (u) => {
          d.settled = !0, s.get(c) === d && i(c, u), a();
        });
      }
      a();
    },
    dispose() {
      n = !0;
      for (const l of s.keys()) r(l);
    }
  };
}
var Vn = "" + new URL("map-assets/table-BYH2YAbI.glb", import.meta.url).href, Xn = "" + new URL("map-assets/chairRounded-CAXjIAhg.glb", import.meta.url).href, Yn = "" + new URL("map-assets/bedSingle-DQi3T5hW.glb", import.meta.url).href, Wn = "" + new URL("map-assets/bookcaseOpenLow-D5KCefka.glb", import.meta.url).href, Zn = "" + new URL("map-assets/tree_oak-BfHnIhp4.glb", import.meta.url).href, qn = "" + new URL("map-assets/stone_largeE-BlCexUuF.glb", import.meta.url).href, $n = "" + new URL("map-assets/stoolBar-K3cU9Dzt.glb", import.meta.url).href, Qn = "" + new URL("map-assets/bench-Bgad_ueP.glb", import.meta.url).href, Jn = "" + new URL("map-assets/loungeSofa-B4ImPSPA.glb", import.meta.url).href, ei = "" + new URL("map-assets/kitchenCabinet-DDG9MLaC.glb", import.meta.url).href, ti = "" + new URL("map-assets/chest-5wu5Viff.glb", import.meta.url).href, si = "" + new URL("map-assets/barrel-CTYVDd_z.glb", import.meta.url).href, ni = "" + new URL("map-assets/kitchenStove-RyR0iXNj.glb", import.meta.url).href, ii = "" + new URL("map-assets/kitchenFridge-DWiEo7GA.glb", import.meta.url).href, oi = "" + new URL("map-assets/kitchenSink-BX1FOFLO.glb", import.meta.url).href, ai = "" + new URL("map-assets/toilet-Lah8VaC1.glb", import.meta.url).href, ri = "" + new URL("map-assets/bathtub-CbRYKtGX.glb", import.meta.url).href, ci = "" + new URL("map-assets/sedan-CvNIPylJ.glb", import.meta.url).href, li = "" + new URL("map-assets/statue_ring-MbjedqWU.glb", import.meta.url).href, hi = "" + new URL("map-assets/tent-canvas-DmLjTNyB.glb", import.meta.url).href, di = "" + new URL("map-assets/pottedPlant-B8kIu3Qg.glb", import.meta.url).href, ui = "" + new URL("map-assets/lampRoundFloor-DO1FJkPg.glb", import.meta.url).href, fi = {
  table: Vn,
  chair: Xn,
  bed: Yn,
  shelf: Wn,
  tree: Zn,
  rock: qn,
  stool: $n,
  bench: Qn,
  sofa: Jn,
  cabinet: ei,
  chest: ti,
  barrel: si,
  stove: ni,
  refrigerator: ii,
  sink: oi,
  toilet: ai,
  bathtub: ri,
  car: ci,
  statue: li,
  tent: hi,
  "potted-plant": di,
  light: ui
};
function pi(e) {
  const t = Re(), i = new Ft(t.sky.color, t.ground, t.sky.intensity), s = new Le(t.key.color, t.key.intensity), n = new Le(t.fill.color, t.fill.intensity), o = [];
  s.shadow.mapSize.set(1024, 1024), s.shadow.normalBias = 0.012, s.shadow.bias = -15e-5, s.shadow.radius = 2, e.add(i, s, s.target, n);
  function a() {
    const r = o.pop();
    r.removeFromParent(), r.dispose();
  }
  return {
    update(r, l, h, c) {
      const d = Re(r.lighting);
      i.color.set(d.sky.color), i.groundColor.set(d.ground), i.intensity = d.sky.intensity, s.color.set(d.key.color), s.intensity = d.key.intensity, s.castShadow = d.shadows, n.color.set(d.fill.color), n.intensity = d.fill.intensity;
      const u = h.getCenter(new A()), m = Math.max(1, h.getSize(new A()).length()), b = r.lighting ? new A(...Pt) : new A(-0.5, 1, 0.5);
      s.position.copy(u).add(b.multiplyScalar(m)), s.target.position.copy(u), n.position.copy(u).add(new A(m, m / 2, -m)), s.updateMatrixWorld(!0), s.target.updateMatrixWorld(!0), s.shadow.updateMatrices(s);
      const _ = h.clone().applyMatrix4(s.shadow.camera.matrixWorldInverse);
      Object.assign(s.shadow.camera, {
        left: _.min.x - 0.3,
        right: _.max.x + 0.3,
        top: _.max.y + 0.3,
        bottom: _.min.y - 0.3,
        near: Math.max(0.01, -_.max.z - 1),
        far: -_.min.z + 1
      }), s.shadow.camera.updateProjectionMatrix(), s.shadow.needsUpdate = !0;
      const g = Nt(r);
      for (; o.length > g.length; ) a();
      g.forEach((p, y) => {
        let f = o[y];
        f || (f = new lt(), o.push(f), e.add(f), f.shadow.mapSize.set(512, 512), f.shadow.normalBias = 0.025, f.shadow.bias = -2e-4, f.shadow.radius = 2, f.shadow.autoUpdate = !1);
        const x = p.radius / l.scale, S = p.overhead ? Math.max(2.2, x * 0.44) : Math.max(1, c.get(p.id)?.y || 0);
        f.color.set(p.color), f.position.copy(l.point(p.x, p.y, S)), f.distance = Math.hypot(x, S), f.decay = 2, f.intensity = S * S * (p.overhead ? 6 : 9), f.castShadow = y < 1, f.shadow.camera.near = 0.08, f.shadow.camera.far = f.distance, f.shadow.camera.updateProjectionMatrix(), f.shadow.needsUpdate = !0;
      });
    },
    invalidateShadows() {
      for (const r of o) r.shadow.needsUpdate = !0;
    },
    dispose() {
      for (; o.length; ) a();
      s.dispose(), s.removeFromParent(), s.target.removeFromParent(), i.removeFromParent(), n.removeFromParent();
    }
  };
}
function _i(e, t, i) {
  let s, n, o, a, r, l, h, c, d, u = !1, m = !1, b = !0, _ = 0, g = 0, p = 0, y = !0, f = !1, x = !1, S, L = "", T = "", O = !1, I = 14, D = 14;
  const R = new AbortController(), N = new ts(), E = new ct(-10, 10, 10, -10, 0.01, 1e3), U = new k(), z = pi(N), re = () => !!e.closest(".theme-dark");
  let Q = re();
  function ce() {
    _ && (cancelAnimationFrame(_), _ = 0);
  }
  function De() {
    u || (u = !0, ce(), R.abort(), h?.disconnect(), c?.disconnect(), d?.disconnect(), o?.dispose(), n?.dispose(), l?.dispose(), a?.dispose(), r?.dispose(), z.dispose(), s?.dispose(), s?.forceContextLoss(), s?.domElement.remove(), N.clear());
  }
  function fe(M) {
    u || m || (m = !0, ce(), i.fallback(M));
  }
  function j() {
    u || m || _ || document.hidden || !e.isConnected || !b || g <= 0 || p <= 0 || (_ = requestAnimationFrame(() => {
      if (_ = 0, !(document.hidden || !e.isConnected || !e.getClientRects().length))
        try {
          O && S && (O = !1, Tt(S)), s.getSize(U), (U.x !== g || U.y !== p) && s.setSize(g, p, !1), s.render(N, E), l?.update(E, g, p, y);
        } catch {
          fe("三维画面暂不可用，已切换二维。");
        }
    }));
  }
  function Ie() {
    const [M, w, G, K] = S.viewBox, { frame: H } = a;
    return new te(H.point(M, w), H.point(M + G, w + K)).union(a.bounds);
  }
  function ye() {
    if (!n || !a) return;
    const M = Ie(), w = M.getCenter(new A()), G = Math.max(1, M.getSize(new A()).length());
    n.target.copy(w), E.position.copy(w).add(new A(9, 13, 15).normalize().multiplyScalar(G * 2)), E.near = G / 1e3, E.far = G * 6, E.lookAt(w), E.updateMatrixWorld(!0);
    let K = 0, H = 0;
    for (const xt of [M.min.x, M.max.x]) for (const Et of [M.min.y, M.max.y]) for (const St of [M.min.z, M.max.z]) {
      const Ue = new A(xt, Et, St).applyMatrix4(E.matrixWorldInverse);
      K = Math.max(K, Math.abs(Ue.x)), H = Math.max(H, Math.abs(Ue.y));
    }
    I = K, D = H;
    const J = Math.max(D, I / (g / p || 1)) * 1.09;
    E.top = J, E.bottom = -J, E.left = -J * (g / p || 1), E.right = -E.left, E.zoom = 1, E.updateProjectionMatrix(), n.update(), j();
  }
  function Fe() {
    if (u) return;
    const M = e.getBoundingClientRect();
    if (g = M.width, p = M.height, g <= 0 || p <= 0) {
      o?.cancel(), ce();
      return;
    }
    E.top = Math.max(D, I / (g / p)) * 1.09, E.bottom = -E.top, E.left = -E.top * g / p, E.right = -E.left, E.updateProjectionMatrix(), j();
  }
  function Tt(M) {
    const w = T !== M.key, G = w ? void 0 : a?.frame;
    l?.dispose(), l = void 0, a?.dispose(), a = void 0, w && (r?.dispose(), r = Kn(async (K, H) => {
      const J = await fetch(fi[K], { signal: H });
      if (!J.ok) throw new Error(`HTTP ${J.status}`);
      return zn(await J.arrayBuffer());
    }, () => {
      O = !0, j();
    }, (K, H) => console.warn(`[Map 3D] ${K}: keeping procedural shape`, H))), a = on(M, Q, r, G), T = M.key, N.add(a.group), a.updateWalls(f), l = rn(t, M, a.anchors), l.symbols(x), z.update(M, a.frame, Ie(), a.anchors), w && ye(), r?.sync(M.elements.flatMap((K) => {
      const H = gt(K);
      return H ? [H] : [];
    }));
  }
  function wt(M) {
    if (u || m) return;
    const w = JSON.stringify(M);
    w !== L && (L = w, S = M, O = !0, j());
  }
  function _e(M) {
    E.zoom = be.clamp(E.zoom * M, 0.4, 6), E.updateProjectionMatrix(), j();
  }
  try {
    s = new Ts({
      antialias: !0,
      alpha: !0,
      powerPreference: "low-power"
    }), s.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8)), s.setClearColor(0, 0), s.outputColorSpace = ne, s.toneMapping = 7, s.toneMappingExposure = 1.1, s.shadowMap.enabled = !0, s.shadowMap.type = 2, s.debug.onShaderError = () => fe("图形驱动无法绘制三维，已切换二维。");
    const M = s.domElement;
    M.setAttribute("aria-label", "三维场景：左键拖动旋转，Shift + 左键拖动平移，滚轮缩放；单指平移，双指拖动旋转、捏合缩放；方向键旋转，Home 全图"), M.title = "左键拖动旋转 · Shift + 左键拖动平移 · 滚轮缩放", M.setAttribute("role", "group"), M.tabIndex = 0, e.prepend(M), n = new Rs(E, M), o = Ct(M, (w) => {
      M.dispatchEvent(new PointerEvent("pointercancel", { pointerId: w }));
    }), n.mouseButtons.RIGHT = null, n.touches = {
      ONE: q.PAN,
      TWO: q.DOLLY_ROTATE
    }, n.enableDamping = !1, n.minPolarAngle = 0.08, n.maxPolarAngle = Math.PI * 0.46, n.minZoom = 0.4, n.maxZoom = 6, n.rotateSpeed = 0.65, n.zoomSpeed = 0.8, n.addEventListener("change", j), M.addEventListener("webglcontextlost", (w) => {
      w.preventDefault(), fe("图形连接已中断，已切换二维。重新打开地图可重试。");
    }, { signal: R.signal }), M.addEventListener("keydown", (w) => {
      if (!(w.ctrlKey || w.metaKey || w.altKey)) {
        if (w.key === "Home") ye();
        else if (w.key === "+" || w.key === "=") _e(1.2);
        else if (w.key === "-") _e(1 / 1.2);
        else if ([
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown"
        ].includes(w.key)) {
          const G = new Ae().setFromVector3(E.position.clone().sub(n.target));
          G.theta += w.key === "ArrowLeft" ? -0.13 : w.key === "ArrowRight" ? 0.13 : 0, G.phi = be.clamp(G.phi + (w.key === "ArrowUp" ? -0.1 : w.key === "ArrowDown" ? 0.1 : 0), n.minPolarAngle, n.maxPolarAngle), E.position.copy(n.target).add(new A().setFromSpherical(G)), n.update(), j();
        } else return;
        w.preventDefault();
      }
    }, { signal: R.signal }), h = new ResizeObserver(() => {
      try {
        Fe();
      } catch {
        fe("三维画面尺寸调整失败，已切换二维。");
      }
    }), h.observe(e), Fe(), c = new IntersectionObserver((w) => {
      b = w[0].isIntersecting, b ? j() : ce();
    }), c.observe(e), document.addEventListener("visibilitychange", () => {
      document.hidden ? ce() : j();
    }, { signal: R.signal }), d = new MutationObserver(() => {
      const w = re();
      w !== Q && (Q = w, O = !0, j());
    });
    for (let w = e; w; w = w.parentElement) d.observe(w, {
      attributes: !0,
      attributeFilter: ["class"]
    });
    return {
      dispose: De,
      setScene: wt,
      fit: ye,
      zoom: _e,
      labels(w) {
        y = w, j();
      },
      walls(w) {
        f = w, a?.updateWalls(w), z.invalidateShadows(), j();
      },
      symbols(w) {
        x = w, l?.symbols(w), j();
      }
    };
  } catch (M) {
    throw De(), M;
  }
}
export {
  _i as createThreeRuntime
};
