using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineFoodOrdering.Migrations
{
    public partial class removingCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Product_Category_CategoryId",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Product_CategoryId",
                table: "Product");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "42c3acde-b3f6-4e7b-afe9-62fc8f363061");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9537a3cb-20c9-4db3-8463-f97cff75999d");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Product");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Product",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "13089f8f-9722-466a-9412-d6bd97bb5927", "4e7b6d3d-c658-4d74-9183-d593a972fdb0", "Administrator", "ASMINISTRATOR" },
                    { "e19ef0f0-eac5-4372-b18c-08b399dfb942", "84852a29-e8aa-4b16-8b99-584ab36dc078", "Viewer", "VIEWER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "13089f8f-9722-466a-9412-d6bd97bb5927");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e19ef0f0-eac5-4372-b18c-08b399dfb942");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Product");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Product",
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

            migrationBuilder.CreateIndex(
                name: "IX_Product_CategoryId",
                table: "Product",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Product_Category_CategoryId",
                table: "Product",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
