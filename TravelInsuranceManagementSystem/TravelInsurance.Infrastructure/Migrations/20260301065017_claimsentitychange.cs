using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelInsurance.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class claimsentitychange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "SettledAmount",
                table: "Claims",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "SettledDate",
                table: "Claims",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SettledAmount",
                table: "Claims");

            migrationBuilder.DropColumn(
                name: "SettledDate",
                table: "Claims");
        }
    }
}
