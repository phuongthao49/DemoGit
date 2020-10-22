using MISA.Common.Models;
using MISA.DataAccess.Interfaces;
using ResourcesVN.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.DataAccess.Repository
{
    public class PositionRepository : BaseRepository<Position>, IPositionRepository
    {
        public PositionRepository(IDatabaseContext<Position> databaseContext) : base(databaseContext)
        {

        }
    }
}
