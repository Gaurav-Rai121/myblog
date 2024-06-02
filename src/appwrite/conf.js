import {client,ID,Databases,Storage,Query} from 'appwrite'
import config from '../config/config';

export class Service{
    client= new client()
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl) // Your API Endpoint
        .setProject(config.appwriteProjectId) // Your project ID
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }

//code to create a post for blog website
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
             return await this.databases.createDocument(
                    config.appwriteDataBaseId,
                    config.appwriteCollectionId,
                    slug,    
                    {
                        title,
                        content,
                        featuredImage,
                        status,
                        userId
                    }
            )
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error ",error);
        }
    }

//code to update a post using appwrite
  async updatePost(slug,{title,content,featuredImage,status}){
    try {
            return await this.databases.updateDocument(
            config.appwriteDataBaseId,
            config.appwriteCollectionId,
            slug,
            {
                title,
                featuredImage,
                content,
                status
            }
          )
        } 
    catch (error) {
        console.log("Appwrite Service :: updatePost :: error ",error);
    }

  }

//code to delete a post using appwrite
 async deletepost(slug){
    try {
        await this.databases.deleteDocument(
            config.appwriteDataBaseId,
            config.appwriteCollectionId,
            slug 
        )
        return true
    } 
    catch (error) {
        console.log("Appwrite Service :: deletePost :: error ",error); 
        return false;
    }
 }

// code to fetch a single post from appwrite database
 async singlePost(slug){
    try {
           return await this.databases.getDocument(
            config.appwriteDataBaseId,
            config.appwriteCollectionId,
            slug
          )
    } catch (error) {
        console.log("Appwrite Service :: singlePost :: error ",error); 
        return false; 
    }
 }

//code to fetch all the  post from appwrite database
 async allPost(querry=[Query.equal("status", "active")]){
    try {
        return await this.databases.listDocuments(
            config.appwriteDataBaseId,
            config.appwriteCollectionId,
            querry

        )
    } catch (error) {
        console.log("Appwrite Service :: allPost :: error ",error); 
        return false;
    }
}

//method for file upload
 async fileupload(file){
    try {
         return await this.bucket.createFile(
            config.appwriteBucketId,
            ID.unique(),
            file

        )
    } catch (error) {
        console.log("Appwrite Service ::fileUpload :: error ",error); 
        return false;    
    }
 }

 //code to delete a file in appwrite
  async deleteFile(fileId){
    try {
         return await this.bucket.deleteFile(
            config.appwriteBucketId,
            fileId
         ) 
    } catch (error) {
        console.log("Appwrite Service :: deleteFile :: error ",error); 
        return false;
    }
  }
 
   getfilePreview(fileId){
     return this.bucket.getFilePreview(
        config.appwriteBucketId,
        fileId
    )
   }


}






const service= new Service()

export default service