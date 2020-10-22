using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.Common.Models
{
    public class Enumeration
    {
        /// <summary>
        /// Hàm enum của giới tính
        /// </summary>
        public enum GenderEnum
        {
            /// <summary>
            /// Nữ
            /// </summary>
            Female = 0,
            /// <summary>
            /// Nam
            /// </summary>
            Male = 1,
            /// <summary>
            /// Chưa xác định
            /// </summary>
            Other = 2
        }
        /// <summary>
        /// Hàm enum của trường trạng thái công việc
        /// </summary>
        /// Create By: LTPThao (14/10/2020)
        public enum WorkStatus
        {
            /// <summary>
            /// Đã nghỉ việc
            /// </summary>
            Stopped = 0,
            /// <summary>
            /// Đang làm việc
            /// </summary>
            Working = 1,
            /// <summary>
            /// Đang thử việc
            /// </summary>
            Waiting = 2
        }
        /// <summary>
        /// Hàm enum của trường hạng thẻ
        /// </summary>
        public enum CardRank
        {
            /// <summary>
            /// Thẻ kim cương
            /// </summary>
            DiamondCard = 0,
            /// <summary>
            /// Thẻ vàng
            /// </summary>
            GoldCard = 1,
            /// <summary>
            /// Thẻ bạc
            /// </summary>
            SilverCard = 2,
            /// <summary>
            /// Thẻ đồng
            /// </summary>
            BronzeCard = 3,
            /// <summary>
            /// Thẻ chưa xác định
            /// </summary>
            Other = 4
        }
    }
}
