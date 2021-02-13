export interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
}

// authSlice.tsで使用するデータ型
export interface PROPS_AUTHEN {
    email: string;
    password: string;
}

export interface PROPS_PROFILE {
    id: number;
    accountName: string;
    // accountProfile: string;
    avatar: File | null;
    // totalDonation: number;
    // accountType: string;
}

export interface PROPS_ACCOUNT_NAME {
    accountName: string;
    accountType: string;
}

// dog_dataSlice.tsで使用するデータ型
export interface PROPS_NEWDATA {
    dogName: string;
    gender: string;
    age: string;
    height: string;
    observations: string;
    color: string;
    hair: string;
    reason_for_arrival: string;
    photo: File | null;
    procedure: string
}

export interface PROPS_DATA {
    dataId: number;
    loginId: number;
    dogName: string;
    gender: string;
    age: string;
    height: string;
    observations: string;
    color: string;
    hair: string;
    reason_for_arrival: string;
    photo: string;
    procedure: string
    companyPost: number;
    registered_at: string
}

export interface PROPS_EDITDATA {
    dataId: number;
    dogName: string;
    gender: string;
    age: string;
    height: string;
    observations: string;
    color: string;
    hair: string;
    reason_for_arrival: string;
    photo: File | null;
}
