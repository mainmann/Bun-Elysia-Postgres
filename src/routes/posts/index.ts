import {Elysia, t} from 'elysia'
import {createPost, deletePost, getPost, getPosts, updatePost} from "./handlers";

const postRoutes = new Elysia({prefix: '/posts'})
    .get('/', ()=> getPosts() )
    .get('/:id', ({params: {id}})=> getPost(id),{
        params: t.Object({
            id: t.Numeric()
        })
    } )
    .post('/', ({body})=> createPost(body), {
        body: t.Object({
            title: t.String({
                minLength: 3,
                maxLength: 30
            }),
            content: t.String({
                minLength: 3,
                maxLength: 50
            }),
        })
    })
    .patch('/:id', ({params: {id}, body})=> updatePost(id, body),{
        params: t.Object({
            id: t.Numeric()
        }),
        body: t.Object({
            title: t.Optional(t.String({
                minLength: 3,
                maxLength: 30
            })),
            content: t.Optional(t.String({
                minLength: 3,
                maxLength: 50
            }))
        },{
            minLength: 1,
        })
    })
    .delete('/:id', ({ params }) =>
            deletePost({ id: params.id }),
        {
            params: t.Object({
                id: t.Numeric()
            })
        }
    )

export default postRoutes
