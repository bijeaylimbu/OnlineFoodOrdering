using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineFoodOrdering.Migrations
{
    public partial class addingQuantityInCart : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "08be31b7-669b-4cd7-957f-f3d008cac95b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "09071f41-3920-4afc-9eb6-d72ff89ae05a");

            migrationBuilder.AddColumn<int>(
                name: "quantity",
                table: "Cart",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "42c3acde-b3f6-4e7b-afe9-62fc8f363061", "281b2fec-946e-4e0e-a4f3-dcdd35b4376e", "Viewer", "VIEWER" },
                    { "9537a3cb-20c9-4db3-8463-f97cff75999d", "c66f96aa-cc0c-4709-a19a-1232131518c8", "Administrator", "ASMINISTRATOR" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "42c3acde-b3f6-4e7b-afe9-62fc8f363061");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9537a3cb-20c9-4db3-8463-f97cff75999d");

            migrationBuilder.DropColumn(
                name: "quantity",
                table: "Cart");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "08be31b7-669b-4cd7-957f-f3d008cac95b", "60b453c7-d3d3-48f0-bfea-7da35b0133f9", "Viewer", "VIEWER" },
                    { "09071f41-3920-4afc-9eb6-d72ff89ae05a", "4b551823-f934-4d4f-a5ae-08336f7d9e66", "Administrator", "ASMINISTRATOR" }
                });
        }
    }
}
