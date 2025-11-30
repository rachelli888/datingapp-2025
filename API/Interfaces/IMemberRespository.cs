using System;
using API.Entities;

namespace API.Interfaces;

public interface IMemberRespository
{
    void Update(Member member);
    Task<bool> SaveAllAsync();
    Task<IReadOnlyList<Member>> GetMembersAsync();
    Task<Member?> GetMemberIdByAsync(string id);
    Task<IReadOnlyList<Photo>> GetPhotosForMemberAsync(string memberid);
}
