import { Event } from "../models/Events.js"

const eventController = {
    
    async list(req, res){
        const {userId} = req
        try{
            const events = await Event.find({userId:userId});
            

            if(events.length === 0){
                return res.status(404).send({message:"Nenhum evento encontrado"})
            }

            res.status(200).send({events})
            
        }catch(err){
            res.status(500).send({message:"erro ao listar eventos"})
        }
    },

    async create(req, res){
        const {title, start, end} = req.body
        const {userId} = req
        try
        {
            const event = await Event.create({title, start, end, userId:userId})

            res.status(201).send({event})
        }catch(err){
            console.log(err)
        }
    },

    async update(req, res){
        const {id} = req.params
        const updatedData = req.body

        try{
            const event = await Event.findByIdAndUpdate(id, updatedData, {new:true})


            if(!event){
                return res.status(404).send({ error: 'Evento não encontrado' });
            }

            res.status(200).send({ event });

        }catch(err){
            console.log(err);
            res.status(500).send({ error: 'Erro ao atualizar evento' });
        }
    },

    async delete(req, res){
        const {id} = req.params
        const {userId} = req

        try{
            const event = await Event.findByIdAndDelete(id)


            if(!event){
                return res.status(404).send({ error: 'Evento não encontrado' });
            }


            res.status(200).send({ message:"Evento deletado com sucesso" });

        }catch(err){
            console.log(err);
            res.status(500).send({ error: 'Erro ao deletar evento' });
        }
    }

}

export default eventController