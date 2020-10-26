using MISA.Common.Models;
using System;
using System.Collections.Generic;

namespace MISA.DataAccess.Interfaces
{
    public interface IEmployeeRepository:IBaseRepository<Employee>
    {

        /// <summary>
        /// Kiểm tra thông tin nhân viên theo mã nhân viên 
        /// </summary>
        /// <param name="employeeCode"></param>
        /// <returns>true: có, false:Không</returns>
        /// Created by: LTPThao
        bool CheckEmployeeByCode(string employeeCode);


        /// <summary>
        /// Lấy mã nhân viên mới tự sinh
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: LPThao
        string GetNewEmployeeCode();
    }
}
