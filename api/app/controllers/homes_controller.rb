class HomesController < ApplicationController
    def index
        err = "none"
        # menta
        if params[:userType] == "menta"
            likes = Like.select(:id, :client_id).where(menta_id: params[:uuid], status: true)

            clients = []
            tag_ids = []
            likes.each do |id| 
                clients.push(Client.joins(:user).select(:name, :profile, :birth, :user_id).find_by(user_id: id.client_id))
                tag_ids.push(ClientTag.select(:id,:tag_id, :client_id).where(client_id: id.client_id))
            end
        
            tag_name = []
            tag_ids.each do |id|
                id.each do |user|
                    tag = Tag.find(user.tag_id)
                    tag_name.push([tag.name, user.client_id])
                end
            end

        
            render json:{ clients: clients, tag_name:tag_name}
        
    
        # client
        # like済みdata
        elsif like = Like.find_by(client_id: params[:uuid], status: true)
            render json: { type: "like", user: like }
        elsif contract = Contract.find_by(client_id: params[:uuid], status: true)
            render json: { type: "contract", user: contract }

        # home用data 
        else
            noneUids = None.select(:menta_id).where(client_id: params[:uuid])
            tags = ClientTag.select(:id, :tag_id).where(client_id: params[:uuid])
            if tags != []
                mentaIds = []
                tags.map {|tag|
                    mentaId = MentaTag.select(:menta_id).where(tag_id: tag.tag_id).where.not(menta_id: noneUids.map{|id| id.menta_id})
                    if mentaId != nil
                        mentaIds.push(mentaId)
                    end
                }

                mentus = nil

                if mentaIds != [[]]
                    mentusId0 = mentaIds[0].sample
                    mentus = Mentum.joins(:user).select(:name, :profile, :birth, :url, :user_id).find_by(user_id: mentusId0.menta_id)
                    tag_id = MentaTag.where(menta_id: mentusId0.menta_id)
                    tag_name = []
                    tag_id.each do |val|
                        tag_name.push(Tag.find(val.tag_id))
                    end
                    err = "err"
                end



                type = 0

                if mentus.nil?
                
                    menta = Mentum.select(:user_id).where.not(user_id: noneUids.map{|id| id.menta_id}).all
                    
                    mentusId = menta.sample
                    
                    mentus = Mentum.joins(:user).select(:name, :profile, :birth, :url, :user_id).find_by(user_id: mentusId)
                    tag_id = MentaTag.where(menta_id: mentusId)
                    tag_name = []
                    tag_id.each do |val|
                        tag_name.push(Tag.find(val.tag_id))
                    end

                    type = 1

                end
            else
                menta = Mentum.select(:user_id).where.not(user_id: noneUids.map{|id| id.menta_id}).all
                mentusId = menta.sample
                mentus = Mentum.joins(:user).select(:name, :profile, :birth, :url, :user_id).find_by(user_id: mentusId)
                tags = MentaTag.where(menta_id: mentusId)
                tag_id = MentaTag.where(menta_id: mentusId)
                tag_name = []
                tag_id.each do |val|
                    tag_name.push(Tag.find(val.tag_id))
                end
                type = 2
            end
            if mentus.nil?
                render json: {type: "noUser"}
            elsif mentus
                render json: { type: "home", menta: mentus, tags: tag_name}
                # render json: { mentus: mentus, mentaIds: mentaIds, mentusId:mentusId , none: noneUids, type: type, err: err}
            end
        end
    end
end


