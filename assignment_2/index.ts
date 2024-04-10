console.log('test')

// const a = () => {
//     const a = Object.keys({test: '1'}).indexOf('test xxx')
//     console.log(a)
// }

// a()


interface IUser {
     //...
    address: {
        postalCode: string
        //...
    }, 
    age: number,
    company: {
        department: string
         //...
    }
    firstName: string
    gender: string
    lastName: string
    hair: {
        color: string
    }
    //...
}

interface IHair {
    [color: string]: number;
}

interface IAddressUser {
    [firstNamelastName: string]: string;
}

interface IUserData {
    male: number; // Male Count Summary
    female: number; // Female Count Summary
    ageRange: string; // Range
    hair: IHair
    addressUser: IAddressUser
}

interface IRes {
    [department: string]: IUserData
}

const handleAgeRange = (userAge: number, currentAgeRange: string) => {
    if (currentAgeRange?.indexOf('XX') !== -1) {
        if (currentAgeRange?.split('-')[1] === 'XX') {
            return `XX-${userAge}`
        } else if (Number(currentAgeRange?.split('-')[1] || 0) < userAge) {
            return `${currentAgeRange?.split('-')[1]}-${userAge}`
        } else {
            return `${userAge}-${currentAgeRange?.split('-')[1]}`
        }
    }
    else {
        if (Number(currentAgeRange?.split('-')[1]) < userAge) {
            return `${currentAgeRange?.split('-')[0]}-${userAge}`
        } else if (userAge < Number(currentAgeRange?.split('-')[0])) {
            return `${userAge}-${currentAgeRange?.split('-')[1]}`
        }
    }
    return currentAgeRange
}

const handleHairColor = (hairColor: string, currentHair: IHair) => {
    return { ...currentHair, [hairColor]: (currentHair?.[hairColor] || 0) + 1 }
}

const handleAddressUser = (userName: string, userPost: string, currentAddressUser: IAddressUser) => {
    return {...currentAddressUser, [userName]: userPost}
}

const handleTemplate = (user: IUser, currentDepartmentData: IUserData) => {
    const isMale =  user.gender === 'male'

    return ({
        male: isMale ? (currentDepartmentData?.male || 0) + 1: currentDepartmentData?.male || 0,
        female: !isMale ? (currentDepartmentData?.female || 0) + 1: currentDepartmentData?.female || 0,
        ageRange: handleAgeRange(user.age,  currentDepartmentData?.ageRange),
        hair: handleHairColor(user.hair.color, currentDepartmentData?.hair ),
        addressUser: handleAddressUser(`${user.firstName}${user.lastName}`, user.address.postalCode, currentDepartmentData?.addressUser)
    })
}

const handleData = (users: IUser[]) => {
    let results: IRes = {}
    
    users.map((user) => {
        const department = user.company.department
        if (typeof department !== 'string') return
        if (results !== null && typeof results === 'object' && Object?.keys(results)?.indexOf(department) !== -1) {
            results[department] = handleTemplate(user, results[department])
        } else if(results !== null && typeof results === 'object') {
            results[department] = handleTemplate(user, {male: 0, female: 0, ageRange: 'XX-XX', hair: {}, addressUser: {}})
        }
    })

    
    console.log(results)
}

const res = async () => {
    const res = await fetch('https://dummyjson.com/users')
    const _jsonRes = await res.json()
    const users = _jsonRes.users


    // console.log(users)
    handleData(users)
}

res()

