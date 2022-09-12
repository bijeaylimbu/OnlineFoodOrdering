using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineFoodOrdering.Migrations
{
    public partial class addingDateAndTime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e0f0532a-a964-4d54-83e7-6a3f9e7d03b5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fb50a645-cd53-43fa-bfd3-3a3c70d69cbe");

            migrationBuilder.AddColumn<DateTime>(
                name: "AddedToCartDateTime",
                table: "Cart",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3b29a1b7-6985-4050-9c6b-6bed5207a18a", "0e37b4f3-da1b-417c-bcac-922471313b52", "Viewer", "VIEWER" },
                    { "79ae9d95-9d37-45c4-868e-170cc9096dec", "f9bc66a5-f7c7-49a1-8ffc-ffd72fb600e1", "Administrator", "ASMINISTRATOR" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3b29a1b7-6985-4050-9c6b-6bed5207a18a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "79ae9d95-9d37-45c4-868e-170cc9096dec");

            migrationBuilder.DropColumn(
                name: "AddedToCartDateTime",
                table: "Cart");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "e0f0532a-a964-4d54-83e7-6a3f9e7d03b5", "25bd9f0f-c492-40b0-92fd-06a8a969778d", "Administrator", "ASMINISTRATOR" },
                    { "fb50a645-cd53-43fa-bfd3-3a3c70d69cbe", "b05ed1f6-a048-468d-90e7-c5e5e153092f", "Viewer", "VIEWER" }
                });
        }
    }
}
