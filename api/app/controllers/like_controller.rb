class LikeController < ApplicationController
    def index
        likes = Like.where(menta_id: params[:menta_id], status: true)
        render json: likes
    end

    def create
        if like = Like.where(client_id: create_like_param[:client_id], menta_id: create_like_param[:menta_id])
            if like.status == false
                like.update(status: true)
            else
                like = Like.create(create_like_param)
            end
        end

    end

    private

    def create_like_param
        params.require(:like).permit(:client_id, :menta_id)
    end
end
