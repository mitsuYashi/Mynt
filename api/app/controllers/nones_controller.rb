class NonesController < ApplicationController
  def create
    if none = None.where(client_id: create_none_param[:client_id], menta_id: create_none_param[:menta_id])
      none.update(date: now.next_month)
    else
      none = None.create(create_none_param)
      none.update(date: now.next_month)
    end
  end

  def destroy
    if nones = None.where(client_id: create_none_param[:client_id], now >= date:)
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
