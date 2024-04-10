var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
console.log('test');
var handleAgeRange = function (userAge, currentAgeRange) {
    if ((currentAgeRange === null || currentAgeRange === void 0 ? void 0 : currentAgeRange.indexOf('XX')) !== -1) {
        if ((currentAgeRange === null || currentAgeRange === void 0 ? void 0 : currentAgeRange.split('-')[1]) === 'XX') {
            return "XX-".concat(userAge);
        }
        else if (Number((currentAgeRange === null || currentAgeRange === void 0 ? void 0 : currentAgeRange.split('-')[1]) || 0) < userAge) {
            return "".concat(currentAgeRange === null || currentAgeRange === void 0 ? void 0 : currentAgeRange.split('-')[1], "-").concat(userAge);
        }
        else {
            return "".concat(userAge, "-").concat(currentAgeRange === null || currentAgeRange === void 0 ? void 0 : currentAgeRange.split('-')[1]);
        }
    }
    else {
        if (Number(currentAgeRange === null || currentAgeRange === void 0 ? void 0 : currentAgeRange.split('-')[1]) < userAge) {
            return "".concat(currentAgeRange === null || currentAgeRange === void 0 ? void 0 : currentAgeRange.split('-')[0], "-").concat(userAge);
        }
        else if (userAge < Number(currentAgeRange === null || currentAgeRange === void 0 ? void 0 : currentAgeRange.split('-')[0])) {
            return "".concat(userAge, "-").concat(currentAgeRange === null || currentAgeRange === void 0 ? void 0 : currentAgeRange.split('-')[1]);
        }
    }
    return currentAgeRange;
};
var handleHairColor = function (hairColor, currentHair) {
    var _a;
    return __assign(__assign({}, currentHair), (_a = {}, _a[hairColor] = ((currentHair === null || currentHair === void 0 ? void 0 : currentHair[hairColor]) || 0) + 1, _a));
};
var handleAddressUser = function (userName, userPost, currentAddressUser) {
    var _a;
    return __assign(__assign({}, currentAddressUser), (_a = {}, _a[userName] = userPost, _a));
};
var handleTemplate = function (user, currentDepartmentData) {
    var isMale = user.gender === 'male';
    return ({
        male: isMale ? ((currentDepartmentData === null || currentDepartmentData === void 0 ? void 0 : currentDepartmentData.male) || 0) + 1 : (currentDepartmentData === null || currentDepartmentData === void 0 ? void 0 : currentDepartmentData.male) || 0,
        female: !isMale ? ((currentDepartmentData === null || currentDepartmentData === void 0 ? void 0 : currentDepartmentData.female) || 0) + 1 : (currentDepartmentData === null || currentDepartmentData === void 0 ? void 0 : currentDepartmentData.female) || 0,
        ageRange: handleAgeRange(user.age, currentDepartmentData === null || currentDepartmentData === void 0 ? void 0 : currentDepartmentData.ageRange),
        hair: handleHairColor(user.hair.color, currentDepartmentData === null || currentDepartmentData === void 0 ? void 0 : currentDepartmentData.hair),
        addressUser: handleAddressUser("".concat(user.firstName).concat(user.lastName), user.address.postalCode, currentDepartmentData === null || currentDepartmentData === void 0 ? void 0 : currentDepartmentData.addressUser)
    });
};
var handleData = function (users) {
    var results = {};
    users.map(function (user) {
        var _a;
        var department = user.company.department;
        if (typeof department !== 'string')
            return;
        if (results !== null && typeof results === 'object' && ((_a = Object === null || Object === void 0 ? void 0 : Object.keys(results)) === null || _a === void 0 ? void 0 : _a.indexOf(department)) !== -1) {
            results[department] = handleTemplate(user, results[department]);
        }
        else if (results !== null && typeof results === 'object') {
            results[department] = handleTemplate(user, { male: 0, female: 0, ageRange: 'XX-XX', hair: {}, addressUser: {} });
        }
    });
    console.log(results);
};
var res = function () { return __awaiter(_this, void 0, void 0, function () {
    var res, _jsonRes, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch('https://dummyjson.com/users')];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                _jsonRes = _a.sent();
                users = _jsonRes.users;
                // console.log(users)
                handleData(users);
                return [2 /*return*/];
        }
    });
}); };
res();
