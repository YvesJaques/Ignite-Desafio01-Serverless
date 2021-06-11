import { document } from "../utils/dynamodbClient"

interface ICreateTodo {
    id: string,    
    title: string,    
    deadline: string
}

export const handle = async (event) => {    
    const { id, title, deadline } = JSON.parse(event.body) as ICreateTodo;  
    const { user_id } = event.pathParameters;
  
    await document
        .put({
            TableName: "todos",
            Item: {
                id,  
                user_id,  
                title,
                done: false,
                deadline: new Date(deadline).toString()
            },
        })    
        .promise();

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: "Todo created!",            
        }),
        headers: {
            "Content-type": "application/json",
        },
    };
};