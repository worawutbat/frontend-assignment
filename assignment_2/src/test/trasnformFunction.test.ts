import { IUser, handleAgeRange, handleHairColor, handleAddressUser, handleTransformData, IDepartmentData } from '../transformData'

const mockUser_1: IUser = {
    firstName: 'Tommy',
    lastName: 'Mo',
    age: 30,
    gender: 'male',
    address: {
        postalCode: '01111'
    },
    hair: {
        color: 'black'
    },
    company: {
        department: 'Marketing'
    }
}

const mockUser_2: IUser = {
    firstName: 'Queen',
    lastName: 'Moba',
    age: 50,
    address: {
        postalCode: '12333'
    },
    gender: 'female',
    hair: {
        color: 'red'
    },
    company: {
        department: 'Engineering'
    }
}

const mockAddressUser = {
    userName: mockUser_1.firstName+mockUser_1.lastName, userPost: mockUser_1.address.postalCode, currentAddressUser: {[mockUser_2.firstName+mockUser_2.lastName]: mockUser_2.address.postalCode}
}

const expectAddressUserResult = {...mockAddressUser.currentAddressUser, [mockAddressUser.userName]: mockAddressUser.userPost}

describe('test handleAddressUser function', () => {
    test(`pass data userName ${mockAddressUser.userName} userPost ${mockAddressUser.userPost} to equal ${expectAddressUserResult}`, () => {
        expect(handleAddressUser(mockAddressUser.userName, mockAddressUser.userPost,mockAddressUser.currentAddressUser)).toEqual(expectAddressUserResult);
    });
  
    test(`pass data userName ${mockUser_2.firstName} userPost ${mockAddressUser.userPost} to not equal ${expectAddressUserResult}`, () => {
        expect(handleAddressUser(mockUser_2.firstName, mockAddressUser.userPost,mockAddressUser.currentAddressUser)).not.toEqual(expectAddressUserResult);
    });

  });


describe('test handleAgeRange function', () => {
    test(`pass data age ${mockUser_1.age} to equal 'XX-${mockUser_1.age}'`, () => {
        expect(handleAgeRange(mockUser_1.age, 'XX-XX')).toEqual(`XX-${mockUser_1.age}`);
    });
  
    test(`pass data age ${mockUser_1.age} more than 1 to equal '1-${mockUser_1.age}'`, () => {
        expect(handleAgeRange(mockUser_1.age, 'XX-1')).toEqual(`1-${mockUser_1.age}`);
    });

    test(`pass data age ${mockUser_1.age} to equal '40-99'`, () => {
        expect(handleAgeRange(mockUser_1.age, '40-99')).toEqual(`${mockUser_1.age}-99`);
    });

    test(`pass data age between 10 and 99 to equal '10-99'`, () => {
        expect(handleAgeRange(mockUser_1.age, '10-99')).toEqual(`10-99`);
    });
  });

  describe('test handleHairColor function', () => {
    test(`pass data hair color '${mockUser_1.hair.color}' and currentHair '{ black: 1 }' to equal '{ black: 2 }'`, () => {
        expect(handleHairColor(mockUser_1.hair.color, {black: 1})).toEqual({ black: 2 });
    });
  
    test(`pass data hair color '${mockUser_1.hair.color}' and currentHair '{ black: 1 }' to equal '{ black: 2, red: 1 }'`, () => {
        expect(handleHairColor(mockUser_2.hair.color, {black: 1})).toEqual({ black: 1, red: 1 });
    });

    test(`pass data hair color '${mockUser_1.hair.color}' and currentHair '{}' to equal '{ black: 1 }'`, () => {
        expect(handleHairColor(mockUser_1.hair.color, {})).toEqual({ black: 1 });
    });
  });

  const expectTransformData: IDepartmentData = {
    [mockUser_1.company.department]: {
        male: 1,
        female: 0,
        hair: {
            [mockUser_1.hair.color]: 1
        },
        ageRange: `XX-${mockUser_1.age}`,
        addressUser: {
            [mockUser_1.firstName+mockUser_1.lastName]: mockUser_1.address.postalCode
        }
    },
    [mockUser_2.company.department]: {
        male: 0,
        female: 1,
        hair: {
            [mockUser_2.hair.color]: 1
        },
        ageRange: `XX-${mockUser_2.age}`,
        addressUser: {
            [mockUser_2.firstName+mockUser_2.lastName]: mockUser_2.address.postalCode
        }
    },
  }

  describe('test handleTransformData function', () => {
    test(`pass data users '[mockUser_1, mockUser_2]' to equal '${expectTransformData}'`, () => {
        expect(handleTransformData([mockUser_1, mockUser_2])).toEqual(expectTransformData);
    });

    test(`pass mis order data users '[mockUser_2, mockUser_1]' to not equal '${expectTransformData}'`, () => {
        expect(handleTransformData([mockUser_2, mockUser_1])).toEqual(expectTransformData);
    });
  });


