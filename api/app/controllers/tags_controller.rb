class TagsController < ApplicationController
  def index
    tag = Tag.all()
    render json: tag
  end
end
