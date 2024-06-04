import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)

            this.account=new Account(this.client);

        
    }

// code to create account in appwrite
   async createAcount({email,password,name}){
    try
    {
      let userAccount= await this.account.create(ID.unique(),email,password,name)
      if(userAccount)
        {
            return this.login
        }

        else
        {
            return userAccount
        }
    } 
    
    catch (error) 
    {
        throw error;
    }
    
   } 

//code to login a user from appwrite databse in appwrite
   async LoginUser({email,password}){
      try 
      {
        let login=await this.account.createEmailSession(email,password);
        return login
      } 
      catch (error)
     {
        return error
     }
   }

//code to check whether a user is logoin or not
  async UserCurrentStatus(){
    try 
    {
        await this.account.get()
    } 
    catch (error) 
    {
        throw error
    }

    return null
  }

//code to logout a user using appwrite
 async logOut(){
    try {
      await this.account.deleteSessions();
    } catch (error) {
        throw error
    }
 }
}
const authService= new AuthService()

export default authService










 





