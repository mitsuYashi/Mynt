class MentaTagsController < ApplicationController
    def index
        menta_tag = Menta_tag.where(params[:menta_id])
        render json: menta_tag
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