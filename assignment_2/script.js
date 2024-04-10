"use strict";
console.log('test');
const handleAgeRange = (userAge, currentAgeRange) => {
    if (currentAgeRange === null || currentAgeRange === void 0 ? void 0 : currentAgeRange.indexOf('XX')) {
        if ((currentAgeRange === null || currentAgeRange === void 0 ? void 0 : currentAgeRange.split('-')[1]) === 'XX') {
            return `XX-${userAge}`;
        }
        else {
            return `${userAge}-${currentAgeRange === null || currentAgeRange === void 0 ? void 0 : currentAgeRange.split('-')[1]}`;
        }
    }
    else {
        if (Number(currentAgeRange === null || currentAgeRange === void 0 ? void 0 : currentAgeRange.split('-')[1]) < userAge) {
            return `${currentAgeRange === null || currentAgeRange === void 0 ? void 0 : currentAgeRange.split('-')[0]}-${userAge}`;
        }
        else if (userAge < Number(currentAgeRange === null || currentAgeRange === void 0 ? void 0 : currentAgeRange.split('-')[0])) {
            return `${userAge}-${currentAgeRange === null || currentAgeRange === void 0 ? void 0 : currentAgeRange.split('-')[1]}`;
        }
    }
    return currentAgeRange;
};
const handleHairColor = (hairColor, currentHair) => {
    return { ...currentHair, [hairColor]: (currentHair[hairColor] || 0) + 1 };
};
const handleAddressUser = (userName, userPost, currentAddressUser) => {
    return { ...currentAddressUser, [userName]: userPost };
};
const handleTemplate = (user, currentDepartmentData) => {
    const isMale = user.gender === 'male';
    return ({
        male: isMale ? ((currentDepartmentData === null || currentDepartmentData === void 0 ? void 0 : currentDepartmentData.male) || 0) + 1 : (currentDepartmentData === null || currentDepartmentData === void 0 ? void 0 : currentDepartmentData.male) || 0,
        female: !isMale ? ((currentDepartmentData === null || currentDepartmentData === void 0 ? void 0 : currentDepartmentData.female) || 0) + 1 : (currentDepartmentData === null || currentDepartmentData === void 0 ? void 0 : currentDepartmentData.female) || 0,
        ageRange: handleAgeRange(user.age, currentDepartmentData === null || currentDepartmentData === void 0 ? void 0 : currentDepartmentData.ageRange),
        hair: handleHairColor(user.hair.color, currentDepartmentData === null || currentDepartmentData === void 0 ? void 0 : currentDepartmentData.hair),
        addressUser: handleAddressUser(`${user.firstName}${user.lastName}`, user.address.postalCode, currentDepartmentData === null || currentDepartmentData === void 0 ? void 0 : currentDepartmentData.addressUser)
    });
};
const handleData = (users) => {
    let results = {};
    users.map((user) => {
        var _a;
        const department = user.company.department;
        if (typeof department !== 'string')
            return;
        if (results !== null && typeof results === 'object' && ((_a = Object === null || Object === void 0 ? void 0 : Object.keys(results)) === null || _a === void 0 ? void 0 : _a.indexOf(department))) {
            results[department] = handleTemplate(user, results[department]);
        }
        else if (results !== null && typeof results === 'object') {
            results[department] = handleTemplate(user, { male: 0, female: 0, ageRange: 'XX-XX', hair: {}, addressUser: {} });
        }
    });
    console.log(results);
};
const res = async () => {
    const res = await fetch('https://dummyjson.com/users');
    const _jsonRes = await res.json();
    const users = _jsonRes.users;
    // console.log(users)
    handleData(users);
};
res();
