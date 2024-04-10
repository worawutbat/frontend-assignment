const API_URL = 'https://dummyjson.com/users'

export interface IUser {
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

export interface IHair {
    [color: string]: number;
}

export interface IAddressUser {
    [firstNamelastName: string]: string;
}

export interface IDepartmentDetail {
    male: number; // Male Count Summary
    female: number; // Female Count Summary
    ageRange: string; // Range
    hair: IHair
    addressUser: IAddressUser
}

export interface IDepartmentData {
    [department: string]: IDepartmentDetail
}

export const handleAgeRange = (userAge: number, currentAgeRange: string) => {
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

export const handleHairColor = (hairColor: string, currentHair: IHair) => {
    return { ...currentHair, [hairColor]: (currentHair?.[hairColor] || 0) + 1 }
}

export const handleAddressUser = (userName: string, userPost: string, currentAddressUser: IAddressUser) => {
    return {...currentAddressUser, [userName]: userPost}
}

export const handleTemplate = (user: IUser, currentDepartmentData: IDepartmentDetail) => {
    const isMale =  user.gender === 'male'

    return ({
        male: isMale ? (currentDepartmentData?.male || 0) + 1: currentDepartmentData?.male || 0,
        female: !isMale ? (currentDepartmentData?.female || 0) + 1: currentDepartmentData?.female || 0,
        ageRange: handleAgeRange(user.age,  currentDepartmentData?.ageRange),
        hair: handleHairColor(user.hair.color, currentDepartmentData?.hair ),
        addressUser: handleAddressUser(`${user.firstName}${user.lastName}`, user.address.postalCode, currentDepartmentData?.addressUser)
    })
}

export const handleTransformData = (users: IUser[]) => {
    let results: IDepartmentData = {}
    
    users.map((user) => {
        const department = user.company.department
        if (typeof department !== 'string') return
        if (Object?.keys(results)?.indexOf(department) !== -1) {
            results[department] = handleTemplate(user, results[department])
        } else {
            results[department] = handleTemplate(user, {male: 0, female: 0, ageRange: 'XX-XX', hair: {}, addressUser: {}})
        }
    })

    return results
}

const onFetchAPI = async (url: string) => {
    const res = await fetch(url)
    const jsonRes = await res.json()
    return jsonRes.users
}

// ยืมมาใช้จาก https://jsfiddle.net/KJQ9K/554/
const syntaxHighlight = (json: string) => {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
          if (/:$/.test(match)) {
              cls = 'key';
          } else {
              cls = 'string';
          }
      } else if (/true|false/.test(match)) {
          cls = 'boolean';
      } else if (/null/.test(match)) {
          cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
  });
}

export const renderData = async (element: HTMLButtonElement) => {
  const users = await onFetchAPI(API_URL)
  const transformData = await handleTransformData(users)

    element.innerHTML = syntaxHighlight(JSON.stringify(transformData))
  }

