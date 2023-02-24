"use strict";
(self["webpackChunk_kelsny_mcmnm"] = self["webpackChunk_kelsny_mcmnm"] || []).push([["src_compositor_preprocessors_base-skin_ts"],{

/***/ "./src/compositor/preprocessors/base-skin.ts":
/*!***************************************************!*\
  !*** ./src/compositor/preprocessors/base-skin.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../functions */ "./src/functions/index.ts");
/* harmony import */ var _replaceColors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../replaceColors */ "./src/compositor/replaceColors.ts");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(skin, data) {
    const skinColor = skin.meta["skin-color"];
    const highlight = (0,_functions__WEBPACK_IMPORTED_MODULE_0__.calculateHighlight)(skin);
    const blush = (0,_functions__WEBPACK_IMPORTED_MODULE_0__.calculateBlush)(skin);
    return (0,_replaceColors__WEBPACK_IMPORTED_MODULE_1__.replaceColors)(data, [
        ["#FF0000", skinColor],
        ["#00FF00", highlight],
        ["#0000FF", blush],
    ]);
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2NvbXBvc2l0b3JfcHJlcHJvY2Vzc29yc19iYXNlLXNraW5fdHMuaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXFFO0FBRXBCO0FBRWpELDZCQUFlLG9DQUFVLElBQWMsRUFBRSxJQUFlO0lBQ3BELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFXLENBQUM7SUFDcEQsTUFBTSxTQUFTLEdBQUcsOERBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0MsTUFBTSxLQUFLLEdBQUcsMERBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVuQyxPQUFPLDZEQUFhLENBQUMsSUFBSSxFQUFFO1FBQ3ZCLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQztRQUN0QixDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUM7UUFDdEIsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDO0tBQ3JCLENBQUMsQ0FBQztBQUNQLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Aa2Vsc255L21jbW5tLy4vc3JjL2NvbXBvc2l0b3IvcHJlcHJvY2Vzc29ycy9iYXNlLXNraW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2FsY3VsYXRlQmx1c2gsIGNhbGN1bGF0ZUhpZ2hsaWdodCB9IGZyb20gXCIuLi8uLi9mdW5jdGlvbnNcIjtcbmltcG9ydCB0eXBlIHsgU2tpbkluZm8gfSBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7IHJlcGxhY2VDb2xvcnMgfSBmcm9tIFwiLi4vcmVwbGFjZUNvbG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc2tpbjogU2tpbkluZm8sIGRhdGE6IEltYWdlRGF0YSkge1xuICAgIGNvbnN0IHNraW5Db2xvciA9IHNraW4ubWV0YVtcInNraW4tY29sb3JcIl0gYXMgc3RyaW5nO1xuICAgIGNvbnN0IGhpZ2hsaWdodCA9IGNhbGN1bGF0ZUhpZ2hsaWdodChza2luKTtcbiAgICBjb25zdCBibHVzaCA9IGNhbGN1bGF0ZUJsdXNoKHNraW4pO1xuXG4gICAgcmV0dXJuIHJlcGxhY2VDb2xvcnMoZGF0YSwgW1xuICAgICAgICBbXCIjRkYwMDAwXCIsIHNraW5Db2xvcl0sXG4gICAgICAgIFtcIiMwMEZGMDBcIiwgaGlnaGxpZ2h0XSxcbiAgICAgICAgW1wiIzAwMDBGRlwiLCBibHVzaF0sXG4gICAgXSk7XG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9