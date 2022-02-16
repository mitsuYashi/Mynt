class NonesController < ApplicationController
  def create
    if none = None.find_by(client_id: create_none_param[:client_id], menta_id: create_none_param[:menta_id])
      none.create(date: now.next_month)
    else
      none = None.create(create_none_param)
      none.update(date: DateTime.now.next_month)
    end
    render json: none
  end

  def destroy
    if nones = None.where(client_id: create_none_param[:client_id])
      nones.each do |none|
        none.delete()
      end
    end
  end

  private
  def create_none_param
    params.require(:none).permit(:client_id, :menta_id)
  end
end
