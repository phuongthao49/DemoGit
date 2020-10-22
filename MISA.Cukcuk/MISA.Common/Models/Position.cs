using System;
using System.Collections.Generic;
using System.Text;

namespace ResourcesVN.Models
{
    public class Position
    {
        /// <summary>
        /// Id vị trí
        /// </summary>
        public Guid PossitionId { get; set; }
        /// <summary>
        /// Tên vị trí
        /// </summary>
        public string PossitionName { get; set; }
    }
}
