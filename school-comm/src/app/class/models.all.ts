export class jyjl{
    id:number;
    date:string;
    money:string;
}

export const init_data=[];

for(let i=0;i<=100;i++ ){
    let info:jyjl={
      id:1000+i,
      date:"2018-08-"+i+" 12:"+i+":00",
      money:(i+1)+"0"
    }
    init_data[i]=info;
  }