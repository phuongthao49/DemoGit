using MISA.Cukcuk.Models;
using System;
using System.Collections.Generic;
using System.Text;
using static MISA.Common.Models.Enumeration;

namespace MISA.Common.Models
{
    public class Employee
    {
        /// <summary>
        /// Khởi tạo đối tượng, khởi tạo EmployeeId tự sinh
        /// </summary>
        public Employee()
        {
            EmployeeId = Guid.NewGuid();
        }

        /// <summary>
        /// Id nhân viên
        /// </summary>
        public Guid EmployeeId { get; set; }

        /// <summary>
        /// Mã nhân viên
        /// </summary>
        public string EmployeeCode { get; set; }

        /// <summary>
        /// Tên nhân viên
        /// </summary>
        public string EmployeeName { get; set; }

        /// <summary>
        /// Ngày sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// Giới tính
        /// </summary>
        public int Gender { get; set; }

        /// <summary>
        /// Xử lý giới tính theo kiểu enum
        /// </summary>
        public string GenderName 
        { 
            get {
                switch (Gender)
                {
                    case 0:
                        return "Nữ";
                    case 1:
                        return "Nam";
                    case 2:
                        return "Không xác định";
                    default:
                        return string.Empty;
                }
            } 
        }

        /// <summary>
        /// email
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// số điện thoại
        /// </summary>
        public string PhoneNumber { get; set; }

        /// <summary>
        /// id vị trí - khóa phụ
        /// </summary>
        public Guid? PossitionId { get; set; }

        /// <summary>
        /// tên vị trí
        /// </summary>
        public string PossitionName { get; set; }

        /// <summary>
        /// id phòng ban
        /// </summary>
        public Guid? DepartmentId { get; set; }

        /// <summary>
        /// tên phòng ban - khóa phụ
        /// </summary>
        public string DepartmentName { get; set; }

        /// <summary>
        /// mã số thuế
        /// </summary>
        public string TaxCode { get; set; }

        /// <summary>
        /// Mức lương
        /// </summary>
        public double? Salary { get; set; }

        /// <summary>
        /// Ngày gia nhập
        /// </summary>
        public DateTime? JoinDate { get; set; }

        /// <summary>
        /// Tình trạng công việc
        /// </summary>
        public int? WorkStatus { get; set; }

        /// <summary>
        /// Các trường hợp xử lý trường tình trạng công việc theo enum
        /// </summary>
        public string WorkStatusName
        {
            get
            {
                if (WorkStatus == null)
                    return string.Empty;
                switch ((WorkStatus)WorkStatus)
                {
                    case Enumeration.WorkStatus.Stopped:
                        return Properties.ResourcesVN.Stopped;
                    case Enumeration.WorkStatus.Working:
                        return Properties.ResourcesVN.Working;
                    case Enumeration.WorkStatus.Waiting:
                        return Properties.ResourcesVN.Waiting;
                    default:
                        return string.Empty;
                }
            }
        }

        /// <summary>
        /// Số chứng minh thư nhân dân
        /// </summary>
        public string IdentityNumber { get; set; }

        /// <summary>
        /// Ngày cấp Chứng minh thư
        /// </summary>
        public DateTime? IdentityDate { get; set; }
        /// <summary>
        /// Nơi cấp chứng minh thư
        /// </summary>
        public string IdentityPlace { get; set; }
    }
}
