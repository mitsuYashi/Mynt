class LikeController < ApplicationController
    def index
        render json: create_like_param[:status]
    end

    def create
        @like = Object.new(params[:status])
        if @like.save
            render json: @like
        else
            render json: @like.error, status: 422
        end
    end
    

    def show
        @like = Like.find(params[:id])
    end

    private

    def create_like_param
        params.require(:like).permit(:status)
    end
end
