
interface IUserName {
  title: string;
  first: string;
  last: string;
}

interface IUserLocation {
  street: {
    number: number;
    name: string;
  };
  city: string;
  state: string;
  country: string;
  postcode: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  timezone: {
    offset: string;
    description: string;
  }
} 

interface IUserDob {
  date: string;
  age: nnumber;
}

interface IUserLogin {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

interface IUserRegistered {
  date: Date;
  age: number;
}

interface IUserID {
  name: string;
  value: string;
}

interface IUserPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

interface IUserResponseData {
  gender: string;
  name: IUserName;
  location: IUserLocation;
  email: string;
  login: IUserLogin;
  dob: IUserDob;
  registered: IUserRegistered;
  phone: string;
  cell: string;
  id: IUserID;
  picture: string;
  nat: string;
}

type IUserResponse = IBaseResponse<IUserResponseData[]>