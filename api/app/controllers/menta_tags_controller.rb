class MentaTagsController < ApplicationController
    def index
        menta_tag = MentaTag.select(:tag_id).where(menta_id: params[:menta_id])
        tag_name = []
        menta_tag.each do |val|
            tag_name.push(Tag.select(:name, :id).find_by(id: val.tag_id))
            # tag_name.push(val)
        end
        render json: tag_name
    end

    def create
        if menta_tag = Menta_tag.where(menta_id: create_menta_tag_param[:menta_id], tag_id: create_menta_tag_param[:tag_id])
            menta_tag = Menta_tag.update(experience: create_menta_tag_param[:experience])
        else
            menta_tag = Menta_tag.create(create_menta_tag_param)
        end
    end

    def update
        if menta_tag = Menta_tag.where(menta_id: create_menta_tag_param[:menta_id], tag_id: create_menta_tag_param[:tag_id])
            menta_tag = Menta_tag.update(experience: create_menta_tag_param[:experience])
        end
    end
    
    def show
        menta_tags = Menta_tag.where(tag_id: params[:tag_id])
        render json: menta_tags
    end

    def destroy
        menta_tag.delete(params[:id])
    end
    
    
    private
    def create_menta_tag_param
        param.require(:menta_tags).permit(:menta_id, :tag_id, :experience)
    end
    
end