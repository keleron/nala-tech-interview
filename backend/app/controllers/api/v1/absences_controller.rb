module Api
  module V1
    class AbsencesController < ApplicationController
      before_action :set_absence, only: %i[show update destroy]

      # GET /absences
      # GET /absences.json
      def index
        @absences = Absence.ransack(params[:q]).result.page(params[:page])
      end

      # GET /absences/1
      # GET /absences/1.json
      def show; end

      # POST /absences
      # POST /absences.json
      def create
        @absence = Absence.new(absence_params)

        if @absence.save
          render :show, status: :created
        else
          render json: @absence.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /absences/1
      # PATCH/PUT /absences/1.json
      def update
        if @absence.update(absence_params)
          render :show, status: :ok
        else
          render json: @absence.errors, status: :unprocessable_entity
        end
      end

      # DELETE /absences/1
      # DELETE /absences/1.json
      def destroy
        @absence.destroy!
      end

      def bulk_create(absences = [])
        CSV.foreach(params[:file], headers: true) do |row|
          absences << { employee_id: row['User ID'], start_date: row['Fecha desde'], end_date: row['Fecha hasta'],
                        absence_type: row['Tipo'], details: row['Motivo'], status: row['Estado'],
                        days: Date.parse(row['Fecha hasta']) - Date.parse(row['Fecha desde']) }
        end
        Absence.upsert_all absences # rubocop:disable Rails/SkipsModelValidations
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_absence
        @absence = Absence.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def absence_params
        params.require(:absence).permit(:employee_id, :leader, :start_date, :end_date, :absence_type, :details, :status)
      end
    end
  end
end
