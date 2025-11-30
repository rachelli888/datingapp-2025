using System;
using API.Interfaces;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Migrations;

public class MemberRespository(AppDbContext context) : IMemberRespository
{
    public async void Update(Member member)
    {
        context.Entry(member).State = EntityState.Modified;
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public async Task<IReadOnlyList<Member>> GetMembersAsync()
    {
        return await context.Members
        .ToListAsync();
    }

    public async Task<Member?> GetMemberIdByAsync(string id)
    {
        return await context.Members.FindAsync(id);
    }

    public async Task<IReadOnlyList<Photo>> GetPhotosForMemberAsync(string memberid)
    {
        return await context.Members
            .Where(x => x.Id == memberid)
            .SelectMany(x => x.Photos)
            .ToListAsync();
    }
}
