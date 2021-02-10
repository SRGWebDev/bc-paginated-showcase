export interface ShowcaseEntry {
    id: string;
    title:string;
    description: string;
    image:{
      title: string;
      url: string;
    },
    url:{
        value:string;
        target:string;
        nofollow:string;
      }
}