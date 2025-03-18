export type Temple = {
    templeId: number;
    templeName: string;
    templeImgSrc: string;
};

export type user = {
    userId: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    profilePicSrc: string;
    templeName: string;
    currentModule: number;
};
