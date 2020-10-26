using MISA.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Bussiness.Interfaces
{
    public interface IEmployeeService: IBaseService<Employee>
    {
        /// <summary>
        /// Lấy mã nhân viên mới tự sinh
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: LPThao
        string GetNewEmployeeCode();
    }
}
