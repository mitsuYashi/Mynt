class HomesController < ApplicationController
    def index
        # like済みdata
        if like = Like.find_by(client_id: params[:uuid], status: true)
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
                    unless mentaId == []
                        mentaIds.push(mentaId)
                    end
                }

                if mentaIds != []
                    mentusId = mentaIds[0].sample
                    mentus = Mentum.joins(:user).select(:name, :profile, :birth, :url, :user_id).find_by(user_id: mentusId)
                end


                tag_id = MentaTag.where(menta_id: mentusId)
                tag_name = []
                tag_id.each do |val|
                    tag_name.push(Tag.find(val.tag_id))
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
            else
                render json: { type: "home", menta: mentus, tags: tag_name}
                # render json: { mentus: mentus, mentasIds: mentaIds, mentusId:mentusId , none: noneUids, type: type}
            end
        end

    end
end
