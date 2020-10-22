using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MISA.Common.Models;
using MISA.Cukcuk.Models;
using static MISA.Common.Models.Enumeration;

namespace MISA.Cukcuk.Models
{
    public class Customer
    {
        public Customer()
        {
            CustomerId = Guid.NewGuid();
        }
        /// <summary>
        /// Khóa chính bảng khách hàng
        /// </summary>
        public Guid CustomerId { get; set; }
        /// <summary>
        /// Mã khách hàng
        /// </summary>
        public string CustomerCode { get; set; }
        /// <summary>
        /// Tên khách hàng
        /// </summary>
        public string CustomerName { get; set; }
        /// <summary>
        /// Tên công ty
        /// </summary>
        public string CompanyName { get; set; }
        /// <summary>
        /// Mã số thuế
        /// </summary>
        public string TaxCode { get; set; }
        /// <summary>
        /// Địa chỉ
        /// </summary>
        public string Address { get; set; }
        /// <summary>
        /// Số điện thoại
        /// </summary>
        public string PhoneNumber { get; set; }
        /// <summary>
        /// email
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// Mã thẻ thành viên
        /// </summary>
        public string CardCode { get; set; }
        /// <summary>
        /// Hạng thẻ
        /// </summary>
        public int? CardRank;
       
        /// <summary>
        /// Khóa phụ: id nhóm khách hàng
        /// </summary>
        public Guid CustomerGroupId { get; set; }
        /// <summary>
        /// Ngày sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }
        /// <summary>
        /// note
        /// </summary>
        public string Note { get; set; }
        /// <summary>
        /// Tình trạng công việc theo enum
        /// </summary>
        public int? WorkStatus { get; set; }
        /// <summary>
        /// Trường hợp tình trạng công việc, nếu = null thì return rỗng ""
        /// </summary>
        /*public string WorkStatusName
        {
            get
            {
                if (WorkStatus == null)
                    return string.Empty;
                // var resource = Resources.ResourceManager.GetObject("ResourcesVN");
                switch ((WorkStatus)WorkStatus)
                {
                    case Enumeration.WorkStatus.Stopped:
                        return Common.Properties.Enum_WorkStatus_Stopped;
                    case Enumeration.WorkStatus.Working:
                        return ResourcesVN.Properties.ResourcesVN.Enum_WorkStatus_Working;
                    case Enumeration.WorkStatus.Waiting:
                        return ResourcesVN.Properties.ResourcesVN.Enum_WorkStatus_Waiting;
                    default:
                        return string.Empty;
                }
            }
        }*/
    }
}
