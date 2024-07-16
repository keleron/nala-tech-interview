module Api
  module V1
    class EmployeesController < ApplicationController
      before_action :set_employee, only: %i[show update destroy]

      # GET /employees
      # GET /employees.json
      def index
        @employees = Employee.ransack(params[:q]).result.page(params[:page])
      end

      # GET /employees/1
      # GET /employees/1.json
      def show; end

      # POST /employees
      # POST /employees.json
      def create
        @employee = Employee.new(employee_params)
        if @employee.save
          render :show, status: :created
        else
          render json: @employee.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /employees/1
      # PATCH/PUT /employees/1.json
      def update
        if @employee.update(employee_params)
          render :show, status: :ok
        else
          render json: @employee.errors, status: :unprocessable_entity
        end
      end

      # DELETE /employees/1
      # DELETE /employees/1.json
      def destroy
        @employee.destroy!
      end

      def bulk_upsert(employees = [])
        CSV.foreach(params[:file], headers: true) do |row|
          employees << { id: row['User ID'], username: row['Email'], name: row['Nombre'] }
        end
        employees = employees.uniq { |hash| hash[:id] }
        Employee.upsert_all employees # rubocop:disable Rails/SkipsModelValidations
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_employee
        @employee = Employee.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def employee_params
        params.require(:employee).permit(:username, :name, :password, :password_confirmation)
      end
    end
  end
end
